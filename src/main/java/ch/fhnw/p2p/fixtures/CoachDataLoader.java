package ch.fhnw.p2p.fixtures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.UserRepository;

@Component
@Order(2)
public class CoachDataLoader implements CommandLineRunner {

	@Autowired
	UserRepository coachRepo;
	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner Coach Setup");
		
		// add coaches
		User coach = new User("Fredi", "Krügger", "fredi.krueger@fhnw.ch", User.Type.COACH);
		coachRepo.save(coach);
		
	}
}