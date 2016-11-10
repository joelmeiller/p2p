package ch.fhnw.p2p.repositories;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
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

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.User;

@RunWith(SpringRunner.class)
@DataJpaTest
public class StudentRepositoryTest {
	
	private User studentFirstName, studentLastName, studentEmail, studentNotFound;
    
	private List<User> students;
	
    @Autowired
    private UserRepository studentRepo;
    

    @Before
    public void prepareEntities() {
    	// Basic search test data
    	studentFirstName = studentRepo.save(new User("Frist", "Test", "firstname.test@fhnw.ch"));
    	studentLastName = studentRepo.save(new User("Test", "Last", "test.lastname@fhnw.ch"));
    	studentEmail = studentRepo.save(new User("Test", "Test", "email@fhnw.ch"));
    	studentNotFound = studentRepo.save(new User("Not", "Found", "not.found@fhnw.ch"));
    	
    	// Add more for limit test
    	studentRepo.save(new User("Limit", "Test", "test.test1@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test2@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test3@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test4@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test5@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test6@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test7@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test8@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test9@fhnw.ch"));
    	studentRepo.save(new User("Limit", "Test", "test.test10@fhnw.ch"));
    	
    	assertEquals(14, studentRepo.findAll().size());
    }
    
    @Test
    public void testSaveStudent() {
    	
    }
    
    @Test
    public void testFindStudentSuggestionFristName() {
    	students = studentRepo.findSuggestions("first");
        
        assertEquals(1, students.size());
        assertTrue(students.contains(studentFirstName));
    }
    
    @Test
    public void testFindStudentSuggestionLastName() {
    	students = studentRepo.findSuggestions("last");
        
        assertEquals(1, students.size());
        assertTrue(students.contains(studentLastName));
    }
    
    @Test
    public void testFindStudentSuggestionEmail() {
    	students = studentRepo.findSuggestions("email");
        
        assertEquals(1, students.size());
        assertTrue(students.contains(studentEmail));
    }	
    
    @Test
    public void testFindStudentSuggestionNone() {
    	students = studentRepo.findSuggestions("notexisting");
        
        assertEquals(0, students.size());
    }
    
    @Test
    public void testFindStudentSuggestionsLimit() {
        students = studentRepo.findSuggestions("test");
        
        assertEquals(13, students.size());
        assertFalse(students.contains(studentNotFound));
    }
}
