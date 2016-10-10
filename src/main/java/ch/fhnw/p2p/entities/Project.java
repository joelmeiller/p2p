package ch.fhnw.p2p.entities;

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
	private List<Category> categories;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "project")
	private List<Member> members;
	
	@Enumerated(EnumType.STRING)
	private Status status;

	public Project() {}
	
	public Project(String title) {
		this.title = title;
		this.slug = Slug.makeSlug(title);
		this.status = Status.OPEN;
	}
}
