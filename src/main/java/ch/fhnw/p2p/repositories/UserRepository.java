package ch.fhnw.p2p.repositories;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import ch.fhnw.p2p.entities.User;

@Transactional
public interface UserRepository extends Repository<User, Long> {
	User save(User user);
	
	User findOne(Long id);
	
	Set<User> findAll();
	
	void deleteAll();
	
	/**
	 * Return the user having the passed email or null if no user is found.
	 * 
	 * @param email the user email.
	 */
	Optional<User> findByEmail(String email);
	
	// TODO: Add limit of maximal 7 students to be found (Problem: LIMIT in Query will fail for JUnit tests as H2 database does not know this command)
	@Query("SELECT stud FROM User stud WHERE stud.status = 'FREE' AND (LOWER(stud.firstName) LIKE ?1% OR LOWER(stud.lastName) LIKE ?1% OR LOWER(stud.email) LIKE ?1%) ORDER BY stud.email ASC")
	List<User> findSuggestions(String suggestion);
}