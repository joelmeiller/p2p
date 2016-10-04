package ch.fhnw.p2p.repositories;

import org.springframework.data.repository.CrudRepository;

import ch.fhnw.p2p.entities.Student;

public interface StudentRepository extends CrudRepository<Student, Long> {
	
}