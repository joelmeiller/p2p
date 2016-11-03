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
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.StudentRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MemberTest {
	
	private Project project; 
	private Student student;
	private Role role;
	private Criteria criteria;
    private List<MemberRating> ratings;

    @Autowired
    private ProjectRepository projectRepo;
    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private RoleRepository roleRepo;
    
    @Autowired
    private MemberRepository repository;

    @Before
    public void prepareEntities() {
    	project = new Project("Test");
    	student = new Student("Max", "Muster", "max.muster@fhnw.ch");
    	role = new Role("Teammember", "TM", Locale.Language.DE);
 
    	ratings = new ArrayList<MemberRating>();
    }
    
    @Test
    public void testSaveMemberEmpty() {
        Member member = repository.save(new Member());
       
        assertNotNull(member.getId());
        assertEquals(Member.Status.NEW, member.getStatus());
        assertNull(member.getProject());
        assertNull(member.getStudent());
        assertNull(member.getComment());
        assertEquals(0, member.getRating(), 0.01);
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
        assertNull(member.getComment());
        assertEquals(0, member.getRating(), 0.01);
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
        assertEquals(role, member.getRoles().get(0).getRole());
        assertNull(member.getComment());
        assertEquals(0, member.getRating(), 0.01);
        assertEquals(0, member.getMemberRatings().size());
     }
}
