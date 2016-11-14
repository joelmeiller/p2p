package ch.fhnw.p2p.entities.mapping;

import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Project.Status;
import lombok.Data;

@Data
public class ProjectMapping {
	
	private Long id;
	private String title;
	private Status status;
	

	public ProjectMapping(Project project) {
		this.id = project.getId();
		this.title = project.getTitle();
		this.status = project.getStatus();
	}
}
