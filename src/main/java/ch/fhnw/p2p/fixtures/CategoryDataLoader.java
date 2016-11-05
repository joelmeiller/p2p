package ch.fhnw.p2p.fixtures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Criteria;
import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.repositories.CategoryRepository;

@Component
@Order(2)
public class CategoryDataLoader implements CommandLineRunner {

	@Autowired
	CategoryRepository repository;
	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner Category");
		
	}
}