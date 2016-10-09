package ch.fhnw.p2p.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import ch.fhnw.p2p.entities.mixins.Versioning;
import lombok.Data;

/**
 * Entity Member
 * 
 * @author Joël Meiller
 *
 *
 **/

@Data
@Entity
public class Member extends Versioning{

	// Constants
	public static enum Type {
		MEMBER, RATING,
	}

	public static enum Status {
		OPEN, READONLY,
	}

	// Attributes
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	
	@ManyToOne
	@JoinColumn(name="projectId")
	private Project project;
	
	@Enumerated(EnumType.STRING)
	private Type type;

	@Enumerated(EnumType.STRING)
	private Status status;

	// Attributs that are set only if member type = MEMBER
	private double rating;

	// Attributs that are set only if member type = RATING
	private String comment;

	// Relations
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "member")
	private Set<CriteriaRating> criteriaRatings;

//	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	@JoinTable(name = "tbl-member-role", joinColumns = {
//			@JoinColumn(name = "memberId", nullable = false, updatable = false) }, inverseJoinColumns = {
//					@JoinColumn(name = "roleId", nullable = false, updatable = false) })
//	private Set<Role> roles;

	// Constructor
	public Member() {
	}

	public Member(long id) {
		this.id = id;
		this.status = Status.OPEN;
		this.type = Type.MEMBER;
	}

	public Member(Type type, Set<CriteriaRating> criteriaRating) {
		this.type = type;
		this.status = Status.OPEN;
		this.criteriaRatings = criteriaRating;
	}
}
