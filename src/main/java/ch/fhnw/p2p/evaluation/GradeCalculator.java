package ch.fhnw.p2p.evaluation;

import java.math.BigDecimal;
import java.util.Set;

import ch.fhnw.p2p.entities.Member;

public abstract class GradeCalculator {

	public static Set<Member> getDeviation(Set<Member> members) {
		double averageRating = 0;
		
		if (members.size() > 0) {
			for (Member member: members) {
				averageRating += member.getRating().doubleValue();
			}
			averageRating = averageRating / members.size();
			
			for (Member member: members) {
				member.setDeviation(new BigDecimal(member.getRating().doubleValue() - averageRating));
			}
		}
		
		return members;
	}
}
