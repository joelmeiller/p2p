package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.repository.Repository;

import ch.fhnw.p2p.entities.Criteria;

@Transactional
public interface CriteriaRepository extends Repository<Criteria, Long>{
	Criteria findOne(Long id);
}
