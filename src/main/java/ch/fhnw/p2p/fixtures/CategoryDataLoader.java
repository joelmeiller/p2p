package ch.fhnw.p2p.fixtures;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Criteria;
import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Project.Zeitmodell;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.CategoryRepository;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.UserRepository;

@Component
@Order(1)
public class CategoryDataLoader implements CommandLineRunner {

	@Autowired
	ProjectRepository projectRepo;
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	UserRepository studentRepo;
	
	@Autowired
	CategoryRepository repository;
	
	@Autowired
	RoleRepository roleRepo;
	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner QM Category Setup");
		
		// Prepare categories
		Category category1 = new Category("Basale Kompetenzen", Locale.Language.EN);
		Criteria criteria11 = new Criteria("Besitzt korrekte Umgangformen", Locale.Language.EN);
		criteria11.setCategory(category1);
		category1.getCriterias().add(criteria11);
		Criteria criteria12 = new Criteria("Hört aufmerksam zu", Locale.Language.EN);
		criteria12.setCategory(category1);
		category1.getCriterias().add(criteria12);
		
		this.repository.save(category1);
		
		Category category2 = new Category("Kommunikative Kompetenzen", Locale.Language.EN);
		Criteria criteria21 = new Criteria("Passt Ausdrucksweise an Stakeholder an", Locale.Language.EN);
		criteria21.setCategory(category2);
		category2.getCriterias().add(criteria21);
		Criteria criteria22 = new Criteria("Kann eigene und fremde Anliegen höflich artikulieren", Locale.Language.EN);
		criteria22.setCategory(category2);
		category2.getCriterias().add(criteria22);
		
		this.repository.save(category2);
		
		Category category3 = new Category("Personal-soziale Kompetenzen", Locale.Language.EN);
		Criteria criteria31 = new Criteria("Kennt eigene soziale Bedürfniss", Locale.Language.EN);
		criteria31.setCategory(category3);
		category3.getCriterias().add(criteria31);
		Criteria criteria32 = new Criteria("KNimmt Befindlichkeiten anderer wahr (Empathie)", Locale.Language.EN);
		criteria32.setCategory(category3);
		category3.getCriterias().add(criteria32);

		this.repository.save(category3);

		Category category4 = new Category("Team Kompetenzen", Locale.Language.EN);
		Criteria criteria41 = new Criteria("Bringt sich selbst im Team ein", Locale.Language.EN);
		criteria41.setCategory(category4);
		category4.getCriterias().add(criteria41);
		Criteria criteria42 = new Criteria("Teilt sein Wissen mit anderen", Locale.Language.EN);
		criteria42.setCategory(category4);
		category4.getCriterias().add(criteria42);

		this.repository.save(category4);

		Category category5 = new Category("Konflikt Kompetenzen", Locale.Language.EN);
		Criteria criteria51 = new Criteria("Sucht bei Problemen/Konflikten rechtzeitig Hilfe", Locale.Language.EN);
		criteria51.setCategory(category5);
		category5.getCriterias().add(criteria51);
		Criteria criteria52 = new Criteria("Weicht Konflikten nicht aus", Locale.Language.EN);
		criteria52.setCategory(category5);
		category5.getCriterias().add(criteria52);

		this.repository.save(category5);

		// Self category
		Category ownCategory = new Category("Own Criterias", Locale.Language.EN);
		ownCategory.setType(Category.Type.SELFDEFINED);
		Criteria ownCriteria = new Criteria("My self-defined criteria", Locale.Language.EN);
		ownCriteria.setCategory(ownCategory);
		ownCategory.getCriterias().add(ownCriteria);
		this.repository.save(ownCategory);
		
		// Add student, project and member
		studentRepo.save(new User("Max", "Muster", "max.muster@students.fhnw.ch", User.Type.STUDENT, User.StudentType.BB));
		Project project = new Project("Test Project");
		project.setStart(new Date(2017 - 1900, 1 - 1, 1));
		project.setStop(new Date(2017 - 1900, 12 - 1, 31));
		// project.setStatus(Status.CLOSE);
		project.setZeitmodell(Zeitmodell.BB);
		
		// Add project categories & criterias
		ProjectCategory projectCategory = new ProjectCategory(category1);
		projectCategory.setProject(project);
		ProjectCriteria projectCriteria = new ProjectCriteria(criteria11);
		projectCriteria.setCategory(projectCategory);
		projectCategory.getProjectCriterias().add(projectCriteria);
		project.getProjectCategories().add(projectCategory);
	
		projectCategory = new ProjectCategory(category2);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);
		
		projectCategory = new ProjectCategory(ownCategory);
		projectCategory.setProject(project);
		projectCriteria = new ProjectCriteria(ownCriteria);
		projectCriteria.setCategory(projectCategory);
		projectCategory.getProjectCriterias().add(projectCriteria);
		project.getProjectCategories().add(projectCategory);
		
		
		User student = studentRepo.findByEmail("max.muster@students.fhnw.ch").get();
		Member member = new Member(project, student);
		project.getMembers().add(member);
		projectRepo.save(project);
		
		// Add test projects
		project = new Project("Test Project 1");
		project.setStart(new Date(2017 - 1900, 1 - 1, 1));
		// project.setStatus(Project.Status.FINAL);
		
		project.setZeitmodell(Zeitmodell.BB);
		projectCategory = new ProjectCategory(category1);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);
	
		projectCategory = new ProjectCategory(category2);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);
		
		projectCategory = new ProjectCategory(ownCategory);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);

		projectRepo.save(project);

		project = new Project("Test Project 2");
		project.setStart(new Date(2017 - 1900, 1 - 1, 1));
		project.setStatus(Project.Status.OPEN);
		
		project.setZeitmodell(Zeitmodell.VZ_TZ);
		projectCategory = new ProjectCategory(category1);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);
	
		projectCategory = new ProjectCategory(category2);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);
		
		projectCategory = new ProjectCategory(ownCategory);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);

		projectRepo.save(project);
	}
}