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
	private final String label2 = "Test Criteria Label 2";

	private Criteria criteria1, criteria2;
	private List<Criteria> criterias;
	
	@Autowired
	private ProjectRepository repository;
	
	@Before
	public void prepareCriterias() {
		criteria1 = new Criteria(label1, defaultLang);
		criteria2 = new Criteria(label2, defaultLang);
		criterias = new ArrayList<Criteria>();
		criterias.add(criteria1);
		criterias.add(criteria2);
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
		assertEquals(0, project.getCriterias().size());
		assertEquals(0, project.getMembers().size());
	}
	
	@Test
	public void testSaveProjectWithTitleAndAddCriterias() {
		Project project = new Project(title);
		project.getCriterias().add(new ProjectCriteria(criteria1));
		project.getCriterias().add(new ProjectCriteria(criteria2));
		
		project = repository.save(project);
		
		assertNotNull(project.getId());
		assertEquals(title, project.getTitle());
		assertEquals(Project.Status.OPEN, project.getStatus());
		assertEquals(2, project.getCriterias().size());
		assertEquals(criteria1, project.getCriterias().get(0).getCriteria());
		assertEquals(criteria2, project.getCriterias().get(1).getCriteria());
		assertEquals(0, project.getMembers().size());
	}
}
