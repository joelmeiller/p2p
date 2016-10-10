package ch.fhnw.p2p.entities;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.repositories.RoleRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RoleTest {
	
	private static String longText = "Test Manager";
	private static String shortText = "TM";
	
	
    private Role role;

    @Autowired
    private RoleRepository repository;

    @Test
    public void testSaveRoleEmpty() {
        role = this.repository.save(new Role());
       
        assertNotNull(role.getId());
        assertEquals(Role.Type.OTHER, role.getType());
        assertNull(role.getTitle());
        assertNull(role.getShortcut());
        assertNotNull(role.getVersion());
        assertNotNull(role.getVersionTSD());
    }
    
    @Test
    public void testSaveRoleWithText() {
    	role = this.repository.save(new Role(longText, shortText));
        
        assertNotNull(role.getId());
        assertEquals(Role.Type.OTHER, role.getType());
        assertEquals(role.getTitle(), longText);
        assertEquals(role.getShortcut(), shortText);
    }
    
    @Test
    public void testSaveRoleWithTextAndType() {
    	role = this.repository.save(new Role(longText, shortText, true));
        
        assertNotNull(role.getId());
        assertEquals(Role.Type.QM, role.getType());
        assertEquals(role.getTitle(), longText);
        assertEquals(role.getShortcut(), shortText);
        
        role = this.repository.save(new Role(longText, shortText, false));
        
        assertNotNull(role.getId());
        assertEquals(Role.Type.OTHER, role.getType());
        assertEquals(role.getTitle(), longText);
        assertEquals(role.getShortcut(), shortText);
    }

}
