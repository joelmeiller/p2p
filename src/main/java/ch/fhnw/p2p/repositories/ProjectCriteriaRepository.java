package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.ProjectCriteria;

@Transactional
public interface ProjectCriteriaRepository extends JpaRepository<ProjectCriteria, Long>{

}
