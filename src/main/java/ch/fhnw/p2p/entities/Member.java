package ch.fhnw.p2p.entities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.mapping.MemberRatingMapping;
import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity Member
 * 
 * @author Joël Meiller
 *
 *
 **/

@Data
@EqualsAndHashCode(callSuper=false, exclude={"project", "roles", "memberRatings"})
@Entity
public class Member extends VersionedObject{

	// Constants
	public static enum Status {
		NEW, // Set when member is added to project by QM
		OPEN, // Set when student confirmes project participation
		READONLY, // Set when student sends the final evaluation
	}

	// Attributes
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	private BigDecimal rating;
	
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	private BigDecimal deviation;

	
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "projectId")
	@JsonIgnore
	private Project project;
	
	// Relations
	@ManyToOne
    @JoinColumn(name = "studentId")
	private User student;
	
	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL, mappedBy="member")
	private Set<MemberRole> roles;

	@Enumerated(EnumType.STRING)
	private Status status;

	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "sourceMember")
	@JsonIgnore
	private List<MemberRating> memberRatings;
	@Transient
	private Set<MemberRatingMapping> ratings;
	
	// The transient fields are required for the JSON parsing but shall be ignored by hibernate
	@Transient
	private boolean added;
	private boolean removed;
	@Transient
	private boolean updated;
	@Transient
	private boolean isQM;

	// Constructor
	public Member() {
		this.status = Status.NEW;
		this.rating = new BigDecimal(0);
		this.deviation = new BigDecimal(0);
		this.roles = new HashSet<MemberRole>();
		this.memberRatings = new ArrayList<MemberRating>();
		this.ratings = new HashSet<MemberRatingMapping>();
	}

	public Member(Project project, User student) {
		this();
		this.project = project;
		this.student = student;
	}
	
	public Member(Project project, User student, Role role) {
		this(project, student);
		this.roles.add(new MemberRole(this, role));
	}

	public Member(Project project, User student, Role role, List<MemberRating> memberRatings) {
		this(project, student, role);
		this.memberRatings = memberRatings;
	}
	
	/**
	 * get currently active role
	 * @return active role of member related to user
	 */
	public Role getActiveRole() {
		for (MemberRole role: this.roles) {
			if (role.isActive()) return role.getRole();
		}
		return null;
	}
	
	
	public Set<MemberRatingMapping> getRatings() {
		ratings = new HashSet<MemberRatingMapping>();
		
		for (MemberRating memberRating: this.memberRatings) {
			ratings.add(new MemberRatingMapping(memberRating));
		}
		
		return ratings;
	}
	
	public String toString() {
		return this.getClass() + " (id=" + this.getId() + ")";
	}
}
