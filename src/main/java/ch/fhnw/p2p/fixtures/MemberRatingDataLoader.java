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
import ch.fhnw.p2p.entities.Student;
import ch.fhnw.p2p.repositories.CategoryRepository;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.ProjectRepositoryImpl;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.StudentRepository;

@Component
@Order(3)
public class MemberRatingDataLoader implements CommandLineRunner {

	@Autowired
	ProjectRepository projectRepo;
	ProjectRepositoryImpl projectRepoImpl = new ProjectRepositoryImpl();
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	StudentRepository studentRepo;
	
	@Autowired
	RoleRepository roleRepo;
	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner TM Member Rating Setup");
		
		// Add student, project and member
		if (!studentRepo.findByEmail("heidi.vonderheide@students.fhnw.ch").isPresent()) studentRepo.save(new Student("Heidi", "Von der Heide", "heidi.vonderheide@students.fhnw.ch", Student.Type.BB));
		
		Project project = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch").getProject();
		Student student = studentRepo.findByEmail("heidi.vonderheide@students.fhnw.ch").get();
		Role re = roleRepo.findByShortcut("RE");
		
		project.getMembers().add(projectRepoImpl.addRatings(new Member(project, student, re)));
		
		projectRepo.save(project);
	}
}