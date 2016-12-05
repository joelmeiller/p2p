package ch.fhnw.p2p.evaluation;

import java.math.BigDecimal;

import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.MemberRating.Status;

public abstract class RatingCalculator {

	/**
	 * set the final rating of a single member rating, if all criteria ratings and
	 * the comment are filled with valid values (not empty and not ZERO)
	 * @param member rating 
	 * @return member rating with calculated team member rating or null if not all ratings are set
	 */
	public static MemberRating calculateMemberRating(MemberRating memberRating) {
		
		if (memberRating.getStatus() == Status.FINAL)
			return memberRating;

		if (memberRating.getComment() == null || memberRating.getComment().isEmpty())
			return null;

		Double finalRating = 0.0;

		// TODO: adjust to match requirement, that the project performance and social competences is rated 1:1
		for (CriteriaRating criteriaRating : memberRating.getCriteriaRatings()) {
			if (criteriaRating.getRating().compareTo(BigDecimal.ZERO) == 0)
				return null;
			finalRating += criteriaRating.getRating().doubleValue();
		}

		if (memberRating.getCriteriaRatings().size() > 0) {
			memberRating.setRating(new BigDecimal(finalRating / memberRating.getCriteriaRatings().size()));
			memberRating.setStatus(Status.FINAL);
		}

		return memberRating;
	}
	
	
	/**
	 * calculates the member rating, if all member ratings
	 * are filled with valid values (not empty and not ZERO). 
	 * 
	 * @return member rating
	 */
	public static Member calculateFinalMemberRating(Member member) {
		Double finalRating = 0.0;
		int ratingCount = 0;
		
		for (MemberRating rating : member.getMemberRatings()) {
			
			// Do not include self evaluation
			if (rating.getSourceMember().getId() != member.getId() && rating.getTargetMember().getId() == member.getId()) {
				for (CriteriaRating criteriaRating : rating.getCriteriaRatings()) {
					if (criteriaRating.getRating().compareTo(BigDecimal.ZERO) == 0)
						return null;
					
					finalRating += criteriaRating.getRating().doubleValue();
				}

				ratingCount += rating.getCriteriaRatings().size();
			}		

			if (rating.getStatus() != MemberRating.Status.FINAL) return null;
		}
		
		if (ratingCount > 0) {
			member.setRating(new BigDecimal(finalRating / ratingCount));
		}
		
		member.setCanFinalize(true);
		
		return member;
	}
}
