package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.repository.Repository;

import ch.fhnw.p2p.entities.ProjectCategory;

@Transactional
public interface ProjectCategoryRepository extends Repository<ProjectCategory, Long>{
	
	ProjectCategory findOne(Long id);
}
