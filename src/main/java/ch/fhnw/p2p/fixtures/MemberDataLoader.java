package ch.fhnw.p2p.fixtures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRole;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
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
		Role tm = roleRepo.findByShortcut("TM");
		Role re = roleRepo.findByShortcut("RE");
		Role pl = roleRepo.findByShortcut("PL");
		Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		MemberRole role = new MemberRole(member, qm);
		member.getRoles().add(role);
		memberRepo.save(member);
		
		// Load other test data
		// Add students
		studentRepo.save(new User("Michelle", "Andrey", "michelle.andrey@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Joel", "Meiller", "joel.meiller@students.fhnw.ch", User.Type.COACH));
		studentRepo.save(new User("Bettina", "Burri", "bettina.burri@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Rebekka", "Stoffel", "rebekka.stoffel@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Elena", "Mastrandrea", "elena.mastrandrea@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		studentRepo.save(new User("Christoph", "Denzler", "christoph.denzler@fhnw.ch", User.Type.COACH));
		studentRepo.save(new User("Stefan", "Vetter", "stefan.vetter@fhnw.ch", User.Type.COACH));


//		Project project = projectRepo.findByTitle("Test Project 1").get();
//
//		User student = studentRepo.findByEmail("joel.meiller@students.fhnw.ch").get();
//		member = new Member(project, student, qm);
//		List<ProjectCriteria> criterias = member.getProject().getProjectCriteria();
//		// Add self rating
//		member.getMemberRatings().add(new MemberRating(member, member, criterias));
//		project.getMembers().add(member);
//		projectRepo.save(project);
//
//		project = projectRepo.findByTitle("Test Project 2").get();
//		student = studentRepo.findByEmail("michelle.andrey@students.fhnw.ch").get();
//		member = new Member(project, student, qm);
//		criterias = member.getProject().getProjectCriteria();
//		// Add self rating
//		member.getMemberRatings().add(new MemberRating(member, member, criterias));
//		project.getMembers().add(member);
//
//		student = studentRepo.findByEmail("rebekka.stoffel@students.fhnw.ch").get();
//		member = new Member(project, student, tm);
//		project.getMembers().add(member);
//
//		student = studentRepo.findByEmail("bettina.burri@students.fhnw.ch").get();
//		member = new Member(project, student, tm);
//		project.getMembers().add(member);
//
//		projectRepo.save(project);

	}
}