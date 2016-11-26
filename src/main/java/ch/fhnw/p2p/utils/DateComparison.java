package ch.fhnw.p2p.utils;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public abstract class DateComparison {

	/**
	 * returns true if the project stop date less than 2 weeks aheahd
	 * as of that moment, no more members and criterias can be added or removed
	 * @param date
	 * @return boolean indicating if the project deadline is less than 2 weeks ahead
	 */
	public static boolean isUpdateDeadlinePast(Date date) {
		LocalDate updateDeadline = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		updateDeadline.minusDays(14);
		
		return updateDeadline.isBefore(LocalDate.now());
	}
}
