package ch.fhnw.p2p.entities.mapping;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Project.Level;
import ch.fhnw.p2p.entities.Project.Status;
import ch.fhnw.p2p.entities.Project.Zeitmodell;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.UserRepository;
import lombok.Data;

@Data
public class NewProject {

	private String title;
	private String coach;
	private Level level;
	private Zeitmodell zeitmodell;
	private Date start;
	private String emailQm;

	public Project getProject(UserRepository userRepo, RoleRepository roleRepo, BindingResult result) throws MappingException {
		if (result.hasErrors()) throw new MappingException("Invalid object");
		if (nullOrEmpty(title)) throw new MappingException("Missing title");
		if (nullOrEmpty(coach)) throw new MappingException("Missing coach");
		if (nullOrEmpty(emailQm)) throw new MappingException("Missing QM");
		if (level == null) throw new MappingException("Missing level");
		if (zeitmodell == null) throw new MappingException("Missing zeitmodell");
		if (start == null) throw new MappingException("Missing start");

		Project project = new Project();
		project.setTitle(title);
		project.setCoach(coach);
		project.setLevel(level);
		project.setZeitmodell(zeitmodell);
		project.setStart(start);
		project.setStatus(Status.OPEN);

		Optional<User> qmUser = userRepo.findByEmail(emailQm);
		if (!qmUser.isPresent()) throw new MappingException("User not found: " + emailQm);
		if (qmUser.get().getStatus() != User.Status.FREE) throw new MappingException("User " + emailQm + " is not free");
		Role qmRole = roleRepo.findByShortcut("QM");
		Member qmMember = new Member(project, qmUser.get(), qmRole);
		project.getMembers().add(qmMember);

		return project;
	}
	
	private boolean nullOrEmpty(String s) {
		return s == null || s.trim().isEmpty();
	}
}
