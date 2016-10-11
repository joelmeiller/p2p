package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import ch.fhnw.p2p.utils.Slug;
import lombok.Data;

/**@author Joël Meiller
  *
  *
  **/
@Data
@Entity
public class Project extends VersionedObject {
	
	public static enum Status {
		OPEN,
		CLOSE,
	}

	private String title;
	private String slug;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "project")
	private List<ProjectCriteria> criterias;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "project")
	private List<Member> members;
	
	@Enumerated(EnumType.STRING)
	private Status status;

	public Project() {
		this.status = Status.OPEN;
		this.criterias = new ArrayList<ProjectCriteria>();
		this.members = new ArrayList<Member>();
	}
	
	public Project(String title) {
		this();
		this.title = title;
		this.slug = Slug.makeSlug(title);
	}
}
