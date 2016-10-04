package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import ch.fhnw.p2p.entities.Student;

@Transactional
public interface StudentRepository extends CrudRepository<Student, Long> {
	/**
	 * Return the user having the passed email or null if no user is found.
	 * 
	 * @param email the user email.
	 */
 	public Student findByEmail(String email);
}