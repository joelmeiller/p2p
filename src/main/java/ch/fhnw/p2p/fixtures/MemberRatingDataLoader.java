package ch.fhnw.p2p.fixtures;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.ProjectRepositoryImpl;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.UserRepository;

@Component
@Order(3)
public class MemberRatingDataLoader implements CommandLineRunner {

	@Autowired
	ProjectRepository projectRepo;
	ProjectRepositoryImpl projectRepoImpl = new ProjectRepositoryImpl();
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	UserRepository studentRepo;
	
	@Autowired
	RoleRepository roleRepo;
	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner TM Member Rating Setup");
		
		// Add student, project and member
		if (!studentRepo.findByEmail("heidi.vonderheide@students.fhnw.ch").isPresent()) studentRepo.save(new User("Heidi", "Von der Heide", "heidi.vonderheide@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		
		Member qm = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		List<ProjectCriteria> criterias = qm.getProject().getProjectCriteria();
		
		// Add self rating
		qm.getMemberRatings().add(new MemberRating(qm, qm, criterias));
		
		Project project = qm.getProject();
		User student = studentRepo.findByEmail("heidi.vonderheide@students.fhnw.ch").get();
		Role re = roleRepo.findByShortcut("RE");
		Member req = new Member(project, student, re);
		
		project.getMembers().add(projectRepoImpl.addMemberToRatings(req));
		
		// Set ratings for heidi
		for (MemberRating rating: req.getMemberRatings()) {	
			rating.setComment("Well done");
			for (CriteriaRating critRating : rating.getCriteriaRatings()) {
				critRating.setRating(new BigDecimal(3));
			}
			rating.checkFinalRating();
		}
		req.setStatus(Member.Status.FINAL);
		
		projectRepo.save(project);
	}
}