package ch.fhnw.p2p.entities.mapping;

import ch.fhnw.p2p.entities.Member;

import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false, exclude={"role", "project"})
public class UserSettings {
	
	private User user;
	private ProjectMapping project;
	private Role role;
	private Rating rating;
	
	
	public UserSettings(User user) {
		this.user = user;
		if (this.user.getMember() != null) {
			this.rating = new Rating(this.user.getMember());
			this.project = new ProjectMapping(this.user.getMember().getProject());
			this.role = this.user.getMember().getActiveRole();
		}
	}
	
	@Data
	class Rating {
		private boolean isFinal;
		private boolean isAccepted;
		
		protected Rating(Member member) {
			this.isFinal = member.getStatus() == Member.Status.FINAL;
			this.isAccepted = member.getStatus() == Member.Status.ACCEPTED;
		}
	}
}
