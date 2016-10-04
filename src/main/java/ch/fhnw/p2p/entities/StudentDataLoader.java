package ch.fhnw.p2p.entities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.repositories.StudentRepository;

@Component
public class StudentDataLoader implements CommandLineRunner {

	private final StudentRepository repository;

	@Autowired
	public StudentDataLoader(StudentRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Student("Max", "Muster", "max.muster@students.fhnw.ch", "bb"));
		// this.repository.save(new Student("Frodo", "Baggins", "frodo.baggins@students.fhnw.ch", ""));
	}
}
