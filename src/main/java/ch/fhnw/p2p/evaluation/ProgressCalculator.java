package ch.fhnw.p2p.evaluation;

import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;

public abstract class ProgressCalculator {

	public static int getMemberProgress(Member member) {
		if (member.getMemberRatings().size() == 0) return 0;
		
		int ratings = (member.getStatus() == Member.Status.FINAL || member.getStatus() == Member.Status.ACCEPTED) ? 100 : 0;
		
		if (member.getStatus() == Member.Status.OPEN) {
			for (MemberRating rating: member.getMemberRatings()) {
				ratings += ProgressCalculator.getRatingProgress(rating);
				
			}
		}
		
		return ratings / member.getMemberRatings().size();
	}

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
		
		return filledRatings / (rating.getCriteriaRatings().size() + 1);
	}
}
