//package ch.fhnw.p2p.repositories;
//
//import static org.junit.Assert.assertEquals;
//import static org.junit.Assert.assertNotNull;
//import static org.junit.Assert.assertTrue;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import ch.fhnw.p2p.entities.Member;
//import ch.fhnw.p2p.entities.Project;
//import ch.fhnw.p2p.entities.Student;
//
//@RunWith(SpringRunner.class)
//@DataJpaTest
//public class ProjectRepositoryTest {
//	
//	private Project project; 
//	private Student student;
//	private Member member;
//   
//    
//    @Autowired
//    private ProjectRepository projectRepo;
//
//    @Before
//    public void prepareEntities() {
//    	project = new Project("Test");
//    	student = new Student("Max", "Muster", "max.muster@fhnw.ch");
//    	member = new Member(project, student);
//    	
//    	project = projectRepo.save(project);
//    }
//    
//    @Test
//    public void testFindProjectByMemberAndStatus() {
//        Project foundProject = project;
//       
//        assertNotNull(foundProject.getId());
//        assertEquals(Project.Status.OPEN, foundProject.getStatus());
//        assertEquals("Test", foundProject.getTitle());
//        assertTrue(foundProject.getMembers().contains(member));
//    }
//}
