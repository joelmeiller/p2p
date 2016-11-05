package ch.fhnw.p2p.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ch.fhnw.p2p.entities.Student;

@Transactional
public interface StudentRepository extends JpaRepository<Student, Long> {
	/**
	 * Return the user having the passed email or null if no user is found.
	 * 
	 * @param email the user email.
	 */
	Optional<Student> findByEmail(String email);
	
	@Query("SELECT stud FROM Student stud WHERE LOWER(stud.firstName) LIKE ?1% OR LOWER(stud.lastName) LIKE ?1% OR LOWER(stud.email) LIKE ?1% ORDER BY stud.email ASC")
	List<Student> findSuggestions(String suggestion);
}