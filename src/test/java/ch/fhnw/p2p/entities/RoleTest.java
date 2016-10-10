package ch.fhnw.p2p.entities;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.repositories.RoleRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RoleTest {
	
	private final String title = "Test Manager";
	private final String shortcut = "TM";
	private final Language defaultLang = Language.DE;
	

    @Autowired
    private RoleRepository repository;

    @Test
    public void testSaveRoleEmpty() {
        Role role = this.repository.save(new Role());
       
        assertNotNull(role.getId());
        assertEquals(Role.Type.OTHER, role.getType());
        assertNull(role.getTitle());
        assertNull(role.getShortcut());
        assertNotNull(role.getVersion());
        assertNotNull(role.getVersionTSD());
    }
    
    @Test
    public void testSaveRoleWithText() {
    	Role role = this.repository.save(new Role(title, shortcut, defaultLang));
        
        assertNotNull(role.getId());
        assertEquals(Role.Type.OTHER, role.getType());
        assertEquals(title, role.getTitle(defaultLang));
        assertEquals(shortcut, role.getShortcut(defaultLang));
     }
    
    @Test
    public void testSaveRoleWithTextAndType() {
    	Role role = this.repository.save(new Role(title, shortcut, true, defaultLang));
        
        assertNotNull(role.getId());
        assertEquals(Role.Type.QM, role.getType());
        assertEquals(title, role.getTitle(defaultLang));
        assertEquals(shortcut, role.getShortcut(defaultLang));
        
        role = this.repository.save(new Role(title, shortcut, false, defaultLang));
        
        assertNotNull(role.getId());
        assertEquals(Role.Type.OTHER, role.getType());
        assertEquals(title, role.getTitle(defaultLang));
        assertEquals(shortcut, role.getShortcut(defaultLang));
    }
}
