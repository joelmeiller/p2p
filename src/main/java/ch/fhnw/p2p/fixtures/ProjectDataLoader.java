package ch.fhnw.p2p.fixtures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.UserRepository;

@Component
@Order(4)
public class ProjectDataLoader implements CommandLineRunner {

	@Autowired
	ProjectRepository projectRepo;
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	UserRepository studentRepo;	
	
	@Autowired
	RoleRepository roleRepo;	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner QM Project Setup");
		
		
		// Add students
		studentRepo.save(new User("Michelle", "Andrey", "michelle.andrey@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Joel", "Meiller", "joel.meiller@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Bettina", "Burri", "bettina.burri@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Rebekka", "Stoffel", "rebekka.stoffel@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Elena", "Mastrandrea", "elena.mastrandrea@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		
		Project project = new Project("Test Project 1");
				
		User student = studentRepo.findByEmail("joel.meiller@students.fhnw.ch").get();
		Role qm = roleRepo.findByShortcut("QM");
		Member member = new Member(project, student, qm);
		project.getMembers().add(member);
		projectRepo.save(project);
		
		project = new Project("Test Project 2");
		
		student = studentRepo.findByEmail("michelle.andrey@students.fhnw.ch").get();
		member = new Member(project, student, qm);
		project.getMembers().add(member);
		projectRepo.save(project);
	}
}