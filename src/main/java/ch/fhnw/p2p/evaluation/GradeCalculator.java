package ch.fhnw.p2p.evaluation;

import java.math.BigDecimal;
import java.util.Set;

import ch.fhnw.p2p.entities.Member;

public abstract class GradeCalculator {

	/**
	 * calculates the grade deviation for each member based on the final member rating
	 * 
	 * @param set of members
	 * @return set of members enriched with deviation
	 */
	public static Set<Member> getDeviations(Set<Member> members) {
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
	
	/**
	 * calculates the grades for each member based on the deviation
	 * 
	 * @param set of members
	 * @return set of members enriched with grade
	 */
	public static Set<Member> getGrades(double grade, Set<Member> members) {
		
		for (Member member : members) {
			member.setGrade(new BigDecimal(grade + member.getDeviation().doubleValue()));
		}
		
		return members;
	}
}
