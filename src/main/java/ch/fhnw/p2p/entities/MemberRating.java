package ch.fhnw.p2p.entities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false, exclude={"sourceMember", "targetMember", "criteriaRatings"})
@Entity
public class MemberRating extends VersionedObject {

	// Attributes
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	@Column(precision = 4, scale = 1)
	private BigDecimal rating;
	private String comment;

	// Relations
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "sourceMemberId")
	private Member sourceMember;

	// Relations
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "targetMemberId")
	private Member targetMember;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "memberRating")
	private List<CriteriaRating> criteriaRatings;

	// Constructor
	public MemberRating() {
		this.criteriaRatings = new ArrayList<CriteriaRating>();
		this.rating = new BigDecimal(0);
	};

	public MemberRating(Member source, Member target) {
		this();
		this.sourceMember = source;
		this.targetMember = target;
	}

	public MemberRating(Member source, Member target, List<ProjectCriteria> criterias) {
		this(source, target);
		
		for (ProjectCriteria criteria: criterias) {
			this.criteriaRatings.add(new CriteriaRating(criteria, this));
		}
	}
	
	public String toString() {
		return this.getClass() + " (id=" + this.getId() + ")" + " - rating=" + this.getRating() + ", comment=" + this.getComment();
	}
}
