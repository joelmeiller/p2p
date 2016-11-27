package ch.fhnw.p2p.entities;

import java.math.BigDecimal;
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
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**@author Joël Meiller
  *
  *
  **/
@Data
@EqualsAndHashCode(callSuper=true, exclude={"projectCategories", "members"})
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
		OPEN, // the team members can set their ratings and the deadline is after the current date
		FINAL, // either all team member send their ratings or the deadline to enter ratings has past
		CLOSE, // final state: closed project. no further interactions possible
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
	
	private Status status;

	// Final grade of the project (not used during project duration)
	@NotNull @DecimalMax("6.0") @DecimalMin("1.0")
	private BigDecimal grade;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "project")
	private Set<ProjectCategory> projectCategories;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "project")
	private Set<Member> members;
	
	public Project() {
		this.status = Status.OPEN;
		this.projectCategories = new HashSet<ProjectCategory>();
		this.members = new HashSet<Member>();
		this.grade = new BigDecimal(4.0);
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
}
