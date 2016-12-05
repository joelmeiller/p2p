package ch.fhnw.p2p.evaluation;

import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;

public abstract class ProgressCalculator {

	/**
	 * calculates the progress over all member ratings of a member
	 * @param member
	 * @return progress overall member ratings in percentage
	 */
	public static int getMemberProgress(Member member) {
		if (member.getMemberRatings().size() == 0) return 0;
		
		int ratings = 0;
		
		for (MemberRating rating: member.getMemberRatings()) {
			ratings += ProgressCalculator.getRatingProgress(rating);			
		}
	
		return ratings / member.getMemberRatings().size();
	}

	/**
	 * calculates the progress over one member ratings 
	 * @param member rating
	 * @return progress of member rating in percentage
	 */
	public static int getRatingProgress(MemberRating  rating) {
		if (rating.getCriteriaRatings().size() == 0) return 0;
		
		int filledRatings = 0;
		
		// Get filled ratings
		for(CriteriaRating criteriaRating: rating.getCriteriaRatings()) {
			if (criteriaRating.getRating().doubleValue() > 0.0) {
				filledRatings += 1;
			}
		}
		
		// Get set comment
		if (rating.getComment() != null && !rating.getComment().isEmpty()) {
			filledRatings++;
		}
		
		return filledRatings / (rating.getCriteriaRatings().size() + 1) * 100;
	}
}
