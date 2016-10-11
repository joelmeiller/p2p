package ch.fhnw.p2p.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;

@Transactional
public interface ProjectCategoryRepository extends JpaRepository<ProjectCategory, Long> {

	List<ProjectCategory> findByProject(Project project);
}
