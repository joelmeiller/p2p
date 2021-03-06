package ch.fhnw.p2p.repositories;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.MemberRole;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.evaluation.GradeCalculator;
import ch.fhnw.p2p.evaluation.ProgressCalculator;
import ch.fhnw.p2p.evaluation.RatingCalculator;

@Component
public class ProjectMemberRepositoryImpl {
	
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
	 * @return set of the project's team members
	 */
	public Set<Member> getProjectMembers(User user) {
		Set<Member> members = new HashSet<Member>();
		if (user.isCoach()) {
			logger.info("Request as coach (no members)");
		} else {
			logger.info("Check project status");
			Project project = checkFinalRatings(user.getMember().getProject());
			
			if (user.isQM()) {
				for (Member member: project.getMembers()) {
					members.add(getMemberRating(project, member));
				}
				
				if (project.getStatus() != Project.Status.OPEN) {
					logger.info("Project in status 'FINAL'. Calculate deviation...");
					members = GradeCalculator.getDeviations(members);
				}
				logger.info("Successfully read project/members for QM " + user.toString() + " of project " + user.getMember().getProject().toString());
			} else {
				members.add(getMemberRating(project, user.getMember()));
				logger.info("Successfully read project/members for Member " + user.toString() + " of project " + user.getMember().getProject().toString());
			}
		}
		return members;
	}
	
	
	private Member getMemberRating(Project project, Member member) {
		Set<MemberRating> memberRatings = new HashSet<MemberRating>();
		Member ratedMember = member.clone();

		if (project.getStatus() != Project.Status.OPEN) {
			// Find ratings of other members for his member
			for (Member mem : project.getMembers()) {
				for (MemberRating rating: mem.getMemberRatings()) {
					if (rating.getTargetMember().getId() == member.getId()) {
						memberRatings.add(rating);
					}
				}
			}
			// Set progress & final rating
			ratedMember.setProgress(100);
			ratedMember.setMemberRatings(memberRatings);
			ratedMember = RatingCalculator.calculateFinalMemberRating(ratedMember);
				
			ratedMember.setStatus(ratedMember.getStatus() == Member.Status.OPEN ? Member.Status.FINAL: ratedMember.getStatus());
				
		} else {
			ratedMember.setProgress(ProgressCalculator.getMemberProgress(member));
			if (ratedMember.getStatus() == Member.Status.FINAL) {
				ratedMember.setStatus(Member.Status.OPEN);
			}
		}
		
		ratedMember.setRatings(ratedMember.getMemberRatings(), false);
		
		return ratedMember;
	}

	/**
	 * checks whether the project is in final status either because all team members successfully set their ratings or the deadline is of
	 * @param project
	 * @return true if all member ratings are in final status.
	 */
	private Project checkFinalRatings(Project project) {
		if (project.getStatus() != Project.Status.OPEN) return project;
		
		boolean isFinal = true;
		for (Member member: project.getMembers()) {
			if (!member.isRemoved()) {
				isFinal = isFinal && member.getStatus() == Member.Status.FINAL;
			}
		}
		
		// 2 weeks before the project stop, no more 
		// if (isFinal && DateComparison.isUpdateDeadlinePast(project.getStop())) {
		if (isFinal) {
			project.setStatus(Project.Status.FINAL);
			projectRepo.save(project);
		}
		
		return project;
	}
	
	/**
	 * add or remove team members
	 * @param Project the user's current project
	 * @param Members the updated list of members to add or remove from project
	 * @return Project the updated project
	 */
	public Project updateProjectMembers(Project project, Set<Member> updatedMembers) {
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
					}
				}	
	
				// Remove existing
				else if (projectMember.isRemoved()) {
					logger.info("Remove student " + studentRepo.findOne(projectMember.getStudent().getId()) + "(id=" + projectMember.getId() + ") from project '" + project.getTitle() + "' (id=" + project.getId() + ")");
					Member removeMember = memberRepo.findOne(projectMember.getId());
					removeMemberFromRatings(removeMember).setRemoved(true);
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
			if (member.getStatus() == Member.Status.FINAL) {
				member.setStatus(Member.Status.OPEN);
			}
		}
		
		return updateMember;
	}
	
	/**
	 * removes the member with the related project criteria from each team member
	 * @param member member to add criteria for each team member
	 * @return Member updated member
	 */
	public Member removeMemberFromRatings (Member removeMember) {
		logger.info("Remove ratings for member " + removeMember.toString() + "(id=" + removeMember.getId() + ")");
		
		// Remove self rating
		removeMember.setMemberRatings(new HashSet<MemberRating>());
		
		for (Member member: removeMember.getProject().getMembers()) {
			// remove ratings of removod member form existing members
			for (MemberRating memberRating: member.getMemberRatings()) {
				if (memberRating.getTargetMember().getId() == removeMember.getId()) {
					member.getMemberRatings().remove(memberRating);
				}
			}
		}
		
		return removeMember;
	}
}
