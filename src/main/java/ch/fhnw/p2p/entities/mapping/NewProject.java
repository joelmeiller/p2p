package ch.fhnw.p2p.entities.mapping;

import java.util.Date;

import org.springframework.validation.BindingResult;

import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Project.Level;
import ch.fhnw.p2p.entities.Project.Status;
import ch.fhnw.p2p.entities.Project.Zeitmodell;
import lombok.Data;

@Data
public class NewProject {

	private String title;
	private String coach;
	private Level level;
	private Zeitmodell zeitmodell;
	private Date start;
	private String emailQm;

	public Project getProject(BindingResult result) throws MappingException {
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

		return project;
	}
	
	private boolean nullOrEmpty(String s) {
		return s == null || s.trim().isEmpty();
	}
}
