package ch.fhnw.p2p.entities.mapping;

import java.math.BigDecimal;
import java.util.Set;

import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.MemberRating;
import lombok.Data;

@Data
public class MemberRatingMapping {
	
	private BigDecimal rating;
	private String comment; 
	private Set<CriteriaRating> criteriaRatings;
	
	public MemberRatingMapping(MemberRating rating) {
		this.rating = rating.getRating();
		this.comment = rating.getComment();
		this.criteriaRatings = this.getCriteriaRatings();
	}
}
