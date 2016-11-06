package ch.fhnw.p2p.repositories;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.MemberRole;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.Student;

public class ProjectRepositoryImpl {
	
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	ProjectRepository projectRepo;
	
	@Autowired
	StudentRepository studentRepo;
	
	/**
	 * add or remove team members
	 * @param Project the user's current project
	 * @param Members the updated list of members to add or remove from project
	 * @return Project the updated project
	 */
	public Project updateProject(Project project, List<Member> updatedMembers) {
		List<Member> members = project.getMembers();
		
		logger.info(members);
		logger.info(updatedMembers.size());
		
		try {
			// Set members
			for (Member projectMember: updatedMembers) {
				// Add new
				if (projectMember.isAdded()) {
					Student student = studentRepo.findOne(projectMember.getStudent().getId());
					logger.info("Add student: " + student.toString() + " to project '" + project.getTitle() + "' (id=" + project.getId() + ")");
					if (projectMember.getRoles() != null && projectMember.getRoles().size() > 0) {
						Role role = roleRepo.findOne(projectMember.getRoles().get(0).getRole().getId());
						members.add(addRatings(new Member(project, student, role)));
					} else {
						members.add(addRatings(new Member(project, student)));					
					}
				}	
	
				// Remove existing
				else if (projectMember.isRemoved()) {
					logger.info("Remove student " + studentRepo.findOne(projectMember.getStudent().getId()) + "(id=" + projectMember.getId() + ") from project '" + project.getTitle() + "' (id=" + project.getId() + ")");
					Member removeMember = memberRepo.findOne(projectMember.getId());
					members.remove(removeMember);
				}
				
				// Update roles of member
				else if (projectMember.isUpdated()) {
					logger.info("Update roles of member " + studentRepo.findOne(projectMember.getStudent().getId()) + "(id=" + projectMember.getId() + ") from project '" + project.getTitle() + "' (id=" + project.getId() + ")");
					Member updateMember = memberRepo.findOne(projectMember.getId());
					List<MemberRole> roles = updateMember.getRoles();
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
	private Member addRatings (Member updateMember) {
		logger.info("Add ratings (Member count:" + updateMember.getProject().getMembers().size() + ")");
		List<ProjectCriteria> criterias = updateMember.getProject().getProjectCriteria();
		
		for (Member member: updateMember.getProject().getMembers()) {
			// Add ratings of existing members to new member
			updateMember.getMemberRatings().add(new MemberRating(updateMember, member, criterias));
			
			// Update existing members with new member
			member.getMemberRatings().add(new MemberRating(member, updateMember, criterias));
		}
		
		return updateMember;
	}
}
