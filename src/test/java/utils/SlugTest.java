package utils;

import static org.junit.Assert.assertEquals;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import ch.fhnw.p2p.utils.Slug;

public class SlugTest {
	
	@Rule
	public final ExpectedException exception = ExpectedException.none();

	@Test
	public void testSlug() {
		// assert statements
		assertEquals("simple slug", "test" , Slug.makeSlug("TeSt"));
		assertEquals("composed slug", "test-of-slug" , Slug.makeSlug("Test Of Slug"));
		assertEquals("composed slug with special chars", "test-slug", Slug.makeSlug("Test!-Slüg%"));
	}
	
	@Test
	public void testSlugFromEmail() {
		// assert statements
		assertEquals("valid simple email", "max", Slug.makeSlugFromEmail("max@students.fhnw.ch"));
		assertEquals("valid composed email", "max-muster", Slug.makeSlugFromEmail("max.muster@students.fhnw.ch"));
		exception.expect(IllegalArgumentException.class);
		Slug.makeSlugFromEmail("Not an email");
	}
}
