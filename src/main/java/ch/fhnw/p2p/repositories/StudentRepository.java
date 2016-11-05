package ch.fhnw.p2p.repositories;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.Student;

@Transactional
public interface StudentRepository extends JpaRepository<Student, Long> {
	/**
	 * Return the user having the passed email or null if no user is found.
	 * 
	 * @param email the user email.
	 */
	Optional<Student> findByEmail(String email);
}