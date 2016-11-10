package ch.fhnw.p2p.fixtures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Criteria;
import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.Student;
import ch.fhnw.p2p.repositories.CategoryRepository;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.StudentRepository;

@Component
@Order(4)
public class ProjectDataLoader implements CommandLineRunner {

	@Autowired
	ProjectRepository projectRepo;
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	StudentRepository studentRepo;	
	
	@Autowired
	RoleRepository roleRepo;	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner QM Project Setup");
		
		
		// Add students
		studentRepo.save(new Student("Michelle", "Andrey", "michelle.andrey@students.fhnw.ch", Student.Type.BB));
		studentRepo.save(new Student("Joel", "Meiller", "joel.meiller@students.fhnw.ch", Student.Type.BB));
		
		Project project = new Project("My Project");
		
		
		Student student = studentRepo.findByEmail("joel.meiller@students.fhnw.ch").get();
		Role qm = roleRepo.findByShortcut("QM");
		Member member = new Member(project, student, qm);
		project.getMembers().add(member);
		projectRepo.save(project);
	}
}