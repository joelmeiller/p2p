package ch.fhnw.p2p.repositories;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.MemberRole;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.evaluation.ProgressCalculator;

public class ProjectRepositoryImpl {
	
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	ProjectRepository projectRepo;
	
	@Autowired
	UserRepository studentRepo;
	
	/**
	 * returns the project's members with the progress or the final rating depending on the project status 
	 * @param Project
	 * @return set of the project's team members Set<Member>
	 */
	public Set<Member> getProjectMembers(User user) {
		Set<Member> members = new HashSet<Member>();
		if (user.isCoach()) {
			logger.info("Request as coach (no members)");
		} else {
			if (user.isQM()) {
				for (Member member: user.getMember().getProject().getMembers()) {
					members.add(getMemberRating(user.getMember().getProject(), member));
				}
				logger.info("Successfully read project/members for QM " + user.toString() + " of project " + user.getMember().getProject().toString());
			} else {
				members.add(getMemberRating(user.getMember().getProject(), user.getMember()));
				logger.info("Successfully read project/members for Member " + user.toString() + " of project " + user.getMember().getProject().toString());
			}
		}
		return members;
	}
	
	private Member getMemberRating(Project project, Member member) {
		List<MemberRating> memberRatings = new ArrayList<MemberRating>();

		member.setProgress(ProgressCalculator.getMemberProgress(member));	

		if (project.getStatus() == Project.Status.FINAL) {
			// Find ratings of other members for his member
			for (Member mem : project.getMembers()) {
				for (MemberRating rating: mem.getMemberRatings()) {
					if (rating.getTargetMember().getId() == member.getId()) {
						if (rating.getSourceMember().getStatus() == Member.Status.FINAL) {
							memberRatings.add(rating);
						} else {
							member.setStatus(Member.Status.OPEN);
						}
					}
				}
			}
			member.setMemberRatings(memberRatings);
		} else {
			member.clearMemberRatings();
		}
		member.setRatings(member.getMemberRatings(), false);
		
		return member;
	}

	
	/**
	 * add or remove team members
	 * @param Project the user's current project
	 * @param Members the updated list of members to add or remove from project
	 * @return Project the updated project
	 */
	public Project updateProject(Project project, Set<Member> updatedMembers) {
		Set<Member> members = project.getMembers();
		
		try {
			// Set members
			for (Member projectMember: updatedMembers) {
				// Add new
				if (projectMember.isAdded()) {
					User student = studentRepo.findOne(projectMember.getStudent().getId());
					logger.info("Add student: " + student.toString() + " to project '" + project.getTitle() + "' (id=" + project.getId() + ")");
					if (projectMember.getRoles() != null && projectMember.getRoles().size() > 0) {
						Role role = roleRepo.findOne(projectMember.getRoles().stream().findFirst().get().getRole().getId());
						
						logger.info("Add ratings for member " + student.toString());
						members.add(addMemberToRatings(new Member(project, student, role)));
					} else {
						logger.info("Add ratings for member " + student.toString());
						members.add(addMemberToRatings(new Member(project, student)));
						student.setStatus(User.Status.ALLOCATED);
						studentRepo.save(student);
					}
				}	
	
				// Remove existing
				else if (projectMember.isRemoved()) {
					logger.info("Remove student " + studentRepo.findOne(projectMember.getStudent().getId()) + "(id=" + projectMember.getId() + ") from project '" + project.getTitle() + "' (id=" + project.getId() + ")");
					Member removeMember = memberRepo.findOne(projectMember.getId());
					removeMember.setRemoved(true);
					User student = studentRepo.findOne(projectMember.getStudent().getId());
					student.setStatus(User.Status.FREE);
					studentRepo.save(student);
				}
				
				// Update roles of member
				else if (projectMember.isUpdated()) {
					logger.info("Update roles of member " + studentRepo.findOne(projectMember.getStudent().getId()) + "(id=" + projectMember.getId() + ") from project '" + project.getTitle() + "' (id=" + project.getId() + ")");
					Member updateMember = memberRepo.findOne(projectMember.getId());
					Set<MemberRole> roles = updateMember.getRoles();
					roles.add(new MemberRole(updateMember, roleRepo.findOne(projectMember.getActiveRole().getId())));
					updateMember.setRoles(roles);
				}
			}
			project.setMembers(members);
			return projectRepo.saveAndFlush(project);	
		} catch(Exception e) {
			logger.error("Error while updating members", e);
			throw e;
		}
	}
	
	
	/**
	 * enriches the member with the related project criteria for each team member
	 * @param member member to add criteria for each team member
	 * @return Member updated member
	 */
	public Member addMemberToRatings (Member updateMember) {
		logger.info("Add ratings for member " + updateMember.toString() + "(id=" + updateMember.getId() + ")");
		List<ProjectCriteria> criterias = updateMember.getProject().getProjectCriteria();
		
		// Add self rating
		updateMember.getMemberRatings().add(new MemberRating(updateMember, updateMember, criterias));
		
		for (Member member: updateMember.getProject().getMembers()) {
			// Add ratings of existing members to new member
			updateMember.getMemberRatings().add(new MemberRating(updateMember, member, criterias));
		
			// Update existing members with new member
			member.getMemberRatings().add(new MemberRating(member, updateMember, criterias));
		}
		
		return updateMember;
	}
}
