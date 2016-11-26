package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Type;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**@author Joël Meiller
  *
  *
  **/
@Data
@EqualsAndHashCode(callSuper=false, exclude={"projectCategories", "members"})
@Entity
public class Project extends VersionedObject {
	
	public static enum Zeitmodell {
		// Berufsbegleitend.
		BB,
		// Vollzeit/Teilzeit.
		VZ_TZ,
	}
	
	public static enum Level {
		IP3,
		IP4,
		IP5
	}
	
	public static enum Status {
		// Neues Projekt.
		OPEN,
		// Alle ratings eingetragen. erst jetzt kann das projekt vom Coach geschlossen werden.
		FINAL,
		// geschlossenes Projekt kann nicht mehr verändert werden.
		CLOSE,
	}

	private String title;
	
//	private String slug;
//	private Date deadline;
	
	private String coach;
	
	@Enumerated(EnumType.STRING)
	private Level level;

	@Enumerated(EnumType.STRING)
	private Zeitmodell zeitmodell;

	@Type(type="date")
	private Date start;

	@Type(type="date")
	private Date stop;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "project")
	private Set<ProjectCategory> projectCategories;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "project")
	private Set<Member> members;
	
	private Status status;
	
	public Project() {
		this.status = Status.OPEN;
		this.projectCategories = new HashSet<ProjectCategory>();
		this.members = new HashSet<Member>();
	}
	
	public Project(String title) {
		this();
		this.title = title;
//		this.slug = Slug.makeSlug(title);
	}
	
	public String toString() {
		return this.title + "(" + this.id.toString() + ")";
	}
	
	public List<ProjectCriteria> getProjectCriteria() {
		List<ProjectCriteria> criterias = new ArrayList<ProjectCriteria>();
		
		for (ProjectCategory category: projectCategories) {
			for (ProjectCriteria criteria: category.getProjectCriterias()) {
				criterias.add(criteria);
			}
		}
		return criterias;
	}
	
	// http://stackoverflow.com/questions/22031128/how-to-update-an-entity-with-spring-data-jpa
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (id == null || obj == null || getClass() != obj.getClass())
            return false;
        Project that = (Project) obj;
        return id.equals(that.id);
    }
    @Override
    public int hashCode() {
        return id == null ? 0 : id.hashCode();
    }
}
