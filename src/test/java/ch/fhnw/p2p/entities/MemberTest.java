package ch.fhnw.p2p.entities;

import static org.junit.Assert.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.repositories.MemberRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MemberTest {
	
	private Project project; 
	private User student;
	private Role role;
    private List<MemberRating> ratings;

   
    
    @Autowired
    private MemberRepository repository;

    @Before
    public void prepareEntities() {
    	project = new Project("Test");
    	student = new User("Max", "Muster", "max.muster@fhnw.ch");
    	role = new Role("Teammember", "TM", Locale.Language.DE);
 
    	ratings = new ArrayList<MemberRating>();
    	ratings.add(new MemberRating());
    }
    
    @Test
    public void testSaveMemberEmpty() {
        Member member = repository.save(new Member());
       
        assertNotNull(member.getId());
        assertEquals(Member.Status.NEW, member.getStatus());
        assertNull(member.getProject());
        assertNull(member.getStudent());
        assertEquals(new BigDecimal(0), member.getRating());
        assertEquals(0, member.getMemberRatings().size());
        assertNotNull(member.getVersion());
        assertNotNull(member.getVersionTSD());
    }
    
    @Test
    public void testSaveMemberWithProjectAndStudent() {
    	Member member = repository.save(new Member(project, student));
    	
        assertNotNull(member.getId());
        assertEquals(Member.Status.NEW, member.getStatus());
        assertEquals(project, member.getProject());
        assertEquals(student, member.getStudent());
        assertEquals(0, member.getRoles().size());
        assertEquals(new BigDecimal(0), member.getRating());
        assertEquals(0, member.getMemberRatings().size());
     }
    
    @Test
    public void testSaveMemberWithProjectStudentAndRole() {
    	Member member = repository.save(new Member(project, student, role));
        
        assertNotNull(member.getId());
        assertEquals(Member.Status.NEW, member.getStatus());
        assertEquals(project, member.getProject());
        assertEquals(student, member.getStudent());
        assertEquals(1, member.getRoles().size());
        // assertTrue(role, member.getRoles().get(0).getRole());
        assertEquals(new BigDecimal(0), member.getRating());
        assertEquals(0, member.getMemberRatings().size());
     }
    
    @Test
    public void testSaveMemberWithRatings() {
    	Member member = repository.save(new Member(project, student, role, ratings));
    	member.setRating(new BigDecimal(3));
    	member.setDeviation(new BigDecimal(0.3));
    	repository.save(member);
        
        assertNotNull(member.getId());
        assertEquals(Member.Status.NEW, member.getStatus());
        assertEquals(project, member.getProject());
        assertEquals(student, member.getStudent());
        assertEquals(1, member.getRoles().size());
        // assertEquals(role, member.getRoles().get(0).getRole());
        assertEquals(new BigDecimal(3), member.getRating());
        assertEquals(new BigDecimal(0.3), member.getDeviation());
        assertEquals(1, member.getMemberRatings().size());
     }
}
