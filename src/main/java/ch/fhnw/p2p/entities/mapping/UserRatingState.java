package ch.fhnw.p2p.entities.mapping;

import ch.fhnw.p2p.entities.Member;
import lombok.Data;

@Data
public class UserRatingState {

	private boolean isFinal;
	private boolean isAccepted;
	private boolean isOpen;

	public UserRatingState(Member member) {
		this.isOpen = member.getStatus() == Member.Status.OPEN;
		this.isFinal = member.getStatus() == Member.Status.FINAL;
		this.isAccepted = member.getStatus() == Member.Status.ACCEPTED;
	}
}
