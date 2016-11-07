package ch.fhnw.p2p.entities.mapping;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.MemberRating;
import lombok.Data;

@Data
public class MemberRatingMapping {
	
	private Long id;

	private BigDecimal rating;
	private String comment;
	private MemberMapping member;
	private Set<CriteriaRatingMapping> criteriaRatings;
	
	public MemberRatingMapping(MemberRating rating) {
		this.id = rating.getId();
		this.rating = rating.getRating();
		this.comment = rating.getComment();
		this.criteriaRatings = new HashSet<CriteriaRatingMapping>();
		for (CriteriaRating criteriaRating: rating.getCriteriaRatings()) {
			this.criteriaRatings.add(new CriteriaRatingMapping(criteriaRating));
		}
		this.member = new MemberMapping(rating.getTargetMember());
	}
}
