package ch.fhnw.p2p.entities;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ProjectTest {

	private final String title = "Test Project";
	private final Language defaultLang = Language.DE;
	private final String label1 = "Test Criteria Label 1";
	private final String label12 = "Test Criteria Label 2";
	private final String label2 = "Test Criteria Label 3";

	private Category category1, category2;
	private List<Category> categories;
	private Criteria criteria1, criteria12, criteria2;
	private List<Criteria> criterias1, criterias2;
	
	@Autowired
	private ProjectRepository repository;
	
	@Before
	public void prepareCriterias() {
		category1 = new Category("Category 1", defaultLang);
		category2 = new Category("Category 2", defaultLang);
		criteria1 = new Criteria(label1, defaultLang);
		criteria12 = new Criteria(label2, defaultLang);
		criteria2 = new Criteria(label2, defaultLang);
		
		category1.getCriterias().add(criteria1);
		category1.getCriterias().add(criteria12);
		category2.getCriterias().add(criteria2);
	}

	@Test
	public void testSaveProjectEmpty() {
		Project project = this.repository.save(new Project());

		assertNotNull(project.getId());
		assertEquals(Project.Status.OPEN, project.getStatus());
		assertNull(project.getTitle());
		assertNotNull(project.getVersion());
		assertNotNull(project.getVersionTSD());
	}

	@Test
	public void testSaveProjectWithTitle() {
		Project project = this.repository.save(new Project(title));

		assertNotNull(project.getId());
		assertEquals(title, project.getTitle());
		assertEquals(Project.Status.OPEN, project.getStatus());
		assertEquals(0, project.getProjectCategories().size());
		assertEquals(0, project.getMembers().size());
	}
	
	@Test
	public void testSaveProjectWithTitleAndAddCriterias() {
		Project project = new Project(title);
		
		ProjectCategory projectCategory1 = new ProjectCategory(category1);
		projectCategory1.getProjectCriterias().add(new ProjectCriteria(criteria1));
		projectCategory1.getProjectCriterias().add(new ProjectCriteria(criteria12));
		project.getProjectCategories().add(projectCategory1);
		
		ProjectCategory projectCategory2 = new ProjectCategory(category2);
		projectCategory2.getProjectCriterias().add(new ProjectCriteria(criteria2));
		project.getProjectCategories().add(projectCategory2);
		
		project = repository.save(project);
		
		assertNotNull(project.getId());
		assertEquals(title, project.getTitle());
		assertEquals(Project.Status.OPEN, project.getStatus());
		assertEquals(2, project.getProjectCategories().size());
		// assertEquals(category1, project.getProjectCategories().get(0).getCategory());
		// assertEquals(2, project.getProjectCategories().get(0).getProjectCriterias().size());
		// assertEquals(category2, project.getProjectCategories().get(1).getCategory());
		// assertEquals(1, project.getProjectCategories().get(1).getProjectCriterias().size());
		assertEquals(0, project.getMembers().size());
	}
}
