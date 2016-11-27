package ch.fhnw.p2p.repositories;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.Project;

@Transactional
public interface ProjectRepository extends JpaRepository<Project, Long> {

	Project findById(Long id);
	
	Optional<Project> findByTitle(String title);
	
}
