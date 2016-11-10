package ch.fhnw.p2p.fixtures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Criteria;
import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRole;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.CategoryRepository;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.UserRepository;

@Component
@Order(2)
public class MemberDataLoader implements CommandLineRunner {

	@Autowired
	ProjectRepository projectRepo;
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	UserRepository studentRepo;
	
	@Autowired
	CategoryRepository categoryRepo;
	
	@Autowired
	RoleRepository roleRepo;
	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner QM Member Setup");
		
		// Add student, project and member
		if (!studentRepo.findByEmail("max.muster@students.fhnw.ch").isPresent()) studentRepo.save(new User("Max", "Muster", "max.muster@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Test", "Person-1", "test.person1@students.fhnw.ch", User.Type.STUDENT, User.StudentType.FULLTIME));
		studentRepo.save(new User("Test", "Person-2", "test.person2@students.fhnw.ch", User.Type.STUDENT, User.StudentType.FULLTIME));
		studentRepo.save(new User("Test", "Person-3", "test.person3@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Test", "Person-4", "test.person4@students.fhnw.ch", User.Type.STUDENT, User.StudentType.FULLTIME));
		studentRepo.save(new User("Test", "Person-5", "test.person5@students.fhnw.ch", User.Type.STUDENT, User.StudentType.PARTTIME));
		studentRepo.save(new User("Test", "Person-6", "test.person6@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Test", "Person-7", "test.person7@students.fhnw.ch", User.Type.STUDENT, User.StudentType.FULLTIME));
		studentRepo.save(new User("Test", "Person-8", "test.person8@students.fhnw.ch", User.Type.STUDENT, User.StudentType.PARTTIME));
		studentRepo.save(new User("Test", "Person-9", "test.person9@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		
		// Add Roles
		Role qm = roleRepo.save(new Role("Quality Manager", "QM", true, Locale.Language.EN));
		roleRepo.save(new Role("Requirements Engineer", "RE", Locale.Language.EN));
		roleRepo.save(new Role("Software Architekt", "SA", Locale.Language.EN));
		roleRepo.save(new Role("Projektleiter", "PL", Locale.Language.EN));
		roleRepo.save(new Role("Test Manager", "TM", Locale.Language.EN));
			
		qm = roleRepo.findOne(qm.getId());
		Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		MemberRole role = new MemberRole(member, qm);
		member.getRoles().add(role);
		memberRepo.save(member);
	}
}