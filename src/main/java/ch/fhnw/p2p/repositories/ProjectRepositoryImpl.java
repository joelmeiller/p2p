package ch.fhnw.p2p.repositories;

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
						members.add(addRatings(new Member(project, student, role)));
					} else {
						members.add(addRatings(new Member(project, student)));					
					}
				}	
	
				// Remove existing
				else if (projectMember.isRemoved()) {
					logger.info("Remove student " + studentRepo.findOne(projectMember.getStudent().getId()) + "(id=" + projectMember.getId() + ") from project '" + project.getTitle() + "' (id=" + project.getId() + ")");
					Member removeMember = memberRepo.findOne(projectMember.getId());
					removeMember.setRemoved(true);
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
	public Member addRatings (Member updateMember) {
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
