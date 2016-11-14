package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.repository.Repository;

import ch.fhnw.p2p.entities.CriteriaRating;


@Transactional
public interface CriteriaRatingRepository extends Repository<CriteriaRating, Long>{
	CriteriaRating findOne(Long id);
}
