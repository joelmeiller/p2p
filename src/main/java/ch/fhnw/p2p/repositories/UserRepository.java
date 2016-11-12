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
	
	/**
	 * Return the user having the passed email or null if no user is found.
	 * 
	 * @param email the user email.
	 */
	Optional<User> findByEmail(String email);
	
	@Query("SELECT stud FROM User stud WHERE stud.status = 'FREE' AND (LOWER(stud.firstName) LIKE ?1% OR LOWER(stud.lastName) LIKE ?1% OR LOWER(stud.email) LIKE ?1%) ORDER BY stud.email ASC")
	List<User> findSuggestions(String suggestion);
}