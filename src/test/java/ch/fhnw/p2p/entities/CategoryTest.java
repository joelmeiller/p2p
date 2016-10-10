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
import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.repositories.CategoryRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CategoryTest {

	private final String title = "Test Category";
	private final Language defaultLang = Language.DE;
	private final String label1 = "Test Criteria Label 1";
	private final String label2 = "Test Criteria Label 2";

	private Criteria criteria1, criteria2;
	private List<Criteria> criterias;
	
	@Autowired
	private CategoryRepository repository;
	
	@Before
	public void prepareCriterias() {
		criteria1 = new Criteria(label1, defaultLang);
		criteria2 = new Criteria(label2, defaultLang);
		criterias = new ArrayList<Criteria>();
		criterias.add(criteria1);
		criterias.add(criteria2);
	}

	@Test
	public void testSaveCategoryEmpty() {
		Category Category = this.repository.save(new Category());

		assertNotNull(Category.getId());
		assertNull(Category.getTitle());
		assertNotNull(Category.getVersion());
		assertNotNull(Category.getVersionTSD());
	}

	@Test
	public void testSaveCategoryWithTitle() {
		Category Category = this.repository.save(new Category(title, defaultLang));

		assertNotNull(Category.getId());
		assertEquals(title, Category.getTitle(defaultLang));
	}

	@Test
	public void testSaveCategoryWithTitleAndCriterias() {
		Category category = this.repository.save(new Category(title, criterias, defaultLang));

		assertNotNull(category.getId());
		assertEquals(title, category.getTitle(defaultLang));
		assertEquals(criterias.size(), category.getCriterias().size());
		assertTrue(category.getCriterias().contains(criteria1));
		assertTrue(category.getCriterias().contains(criteria2));
	}
}
