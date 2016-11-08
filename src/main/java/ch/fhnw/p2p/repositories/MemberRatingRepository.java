package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.repository.Repository;

import ch.fhnw.p2p.entities.MemberRating;

@Transactional
public interface MemberRatingRepository extends Repository<MemberRating, Long>{
	MemberRating save(MemberRating entity);
	
	MemberRating findByIdAndSourceMemberId(Long id, Long sourceMemberId);
}
