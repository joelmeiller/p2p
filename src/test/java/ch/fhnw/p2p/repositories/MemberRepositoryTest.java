package ch.fhnw.p2p.repositories;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.Student;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MemberRepositoryTest {
	
	private final String email1 = "heidi.heide@fhnw.ch";
	private final String email2 = "max.muster@test.ch";
	private final String email3 = "add.me@test.ch";
	
	private Project project1, project2; 
	private Student student1, student2, student3;
	private Member member1, member2;
	private Role role;
   
    
    @Autowired
    private ProjectRepository projectRepo;
    
    @Autowired
    private StudentRepository studentRepo;
    
    @Autowired
    private MemberRepository memberRepo;
    
    @Autowired
    private RoleRepository roleRepo;
    

    @Before
    public void prepareEntities() {
    	project1 = new Project("Test 1");
    	student1 = studentRepo.save(new Student("Heidi", "Von Der Heide", email1));
    	member1 = memberRepo.save(new Member(project1, student1));
    	project1.getMembers().add(member1);
    	project1 = projectRepo.save(project1);
    	
    	project2 = new Project("Test");
    	student2 = studentRepo.save(new Student("Max", "Muster", email2));
    	member2 = memberRepo.save(new Member(project2, student2));
    	project2.getMembers().add(member2);
    	project2 = projectRepo.save(project2);
    	
    	student3 = studentRepo.save(new Student("Add", "Me", email3));
    	
    	role = roleRepo.save(new Role("Requirements Engineer", "RE", Locale.Language.EN));
    	
    	
    	assertEquals(2, projectRepo.findAll().size());
    	assertEquals(3, studentRepo.findAll().size());
    	assertEquals(2, memberRepo.findAll().size());
    }
    
    @Test
    public void testFindMemberByStudent() {
    	Member testMember = memberRepo.findByStudentEmail(email1);
        assertNotNull(testMember.getId());
        assertEquals(member1, testMember);
        
        testMember = memberRepo.findByStudentEmail(email2);  	
        assertNotNull(testMember.getId());
        assertEquals(member2, testMember);
    }
}
