package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.hibernate.validator.constraints.NotEmpty;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import ch.fhnw.p2p.utils.Slug;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**@author Joël Meiller
  *
  *
  **/
@Data
@EqualsAndHashCode(of="id")
@Entity
public class Project extends VersionedObject {
	
	public static enum Status {
		OPEN,
		CLOSE,
	}

	private String title;
	private String slug;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "project")
	private List<ProjectCategory> categories;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "project")
	private List<Member> members;
	
	@Enumerated(EnumType.STRING)
	private Status status;

	public Project() {
		this.status = Status.OPEN;
		this.categories = new ArrayList<ProjectCategory>();
		this.members = new ArrayList<Member>();
	}
	
	public Project(String title) {
		this();
		this.title = title;
		this.slug = Slug.makeSlug(title);
	}
	
	public String toString() {
		return this.title + "(" + this.id.toString() + ")";
	}
}
