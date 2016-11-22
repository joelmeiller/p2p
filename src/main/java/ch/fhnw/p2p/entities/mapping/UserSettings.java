package ch.fhnw.p2p.entities.mapping;
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
	private UserRatingState ratingState;
	
	
	public UserSettings(User user) {
		this.user = user;
		if (this.user.getMember() != null) {
			this.ratingState = new UserRatingState(this.user.getMember());
			this.project = new ProjectMapping(this.user.getMember().getProject());
			this.role = this.user.getMember().getActiveRole();
		}
	}
}
