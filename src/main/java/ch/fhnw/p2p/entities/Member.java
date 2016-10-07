package ch.fhnw.p2p.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

/** Entity Member
 * @author Joël Meiller
 *
 *
 **/
@Data
@Entity
@Table(name = "tbl-member")
public class Member {

	// Constants
	public static enum Type {
		MEMBER, RATING,
	}

	public static enum Status {
		OPEN, READONLY,
	}

	// Attributes
	@Id
	@GeneratedValue
	private Long id;

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

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "tbl-member-role", joinColumns = {
			@JoinColumn(name = "memberId", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "roleId", nullable = false, updatable = false) })
	private Set<Role> roles;

	// Constructor
	public Member() {
	}

	public Member(long id) {
		this.id = id;
	}

	public Member(Type type, Set<CriteriaRating> criteriaRating) {
		this.status = Status.OPEN;
		this.criteriaRatings = criteriaRating;
	}
}
