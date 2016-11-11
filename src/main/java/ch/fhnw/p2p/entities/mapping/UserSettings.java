package ch.fhnw.p2p.entities.mapping;

import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import lombok.Data;

@Data
public class UserSettings {
	
	private User user;
	private ProjectMapping project;
	private Role role;
	

	public UserSettings(User user) {
		this.user = user;
		if (this.user.getMember() != null) {
			this.project = new ProjectMapping(this.user.getMember().getProject());
			this.role = this.user.getMember().getActiveRole();
		}
	}
}
