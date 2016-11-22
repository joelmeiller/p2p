package ch.fhnw.p2p.entities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false, exclude={"criteriaRatings", "progress"})
@Entity
public class MemberRating extends VersionedObject {
	
	// Status of a single member's rating
	public static enum Status {
		OPEN,
		FINAL,
	}

	// Attributes
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	@Column(precision = 4, scale = 1)
	private BigDecimal rating;
	private String comment;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@Transient
	private Double progress;

	// Relations
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "sourceMemberId")
	private Member sourceMember;

	// Relations
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "targetMemberId")
	private Member targetMember;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "memberRating")
	private List<CriteriaRating> criteriaRatings;

	// Constructor
	public MemberRating() {
		this.criteriaRatings = new ArrayList<CriteriaRating>();
		this.rating = BigDecimal.ZERO;
		this.status = Status.OPEN;
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
	
	/**
	 * checks and sets the final status and rating of a single member rating, if all criteria ratings and
	 * the comment are filled with valid values (not empty and not ZERO)
	 * @return boolean indicating if the member rating is in the final status 
	 */
	public boolean checkFinalRating() {
		if (this.status == Status.FINAL) return true;
		
		if (this.getComment() == null || this.getComment().isEmpty()) return false;

		Double finalRating = 0.0;

		for (CriteriaRating criteriaRating : this.criteriaRatings) {
			if (criteriaRating.getRating().compareTo(BigDecimal.ZERO) == 0)
				return false;
			finalRating += criteriaRating.getRating().doubleValue();
		}

		if (this.criteriaRatings.size() > 0) {
			this.rating = new BigDecimal(finalRating / this.criteriaRatings.size());
			this.status = Status.FINAL;
		}
		
		return true;
	}
	
	public String toString() {
		return this.getClass() + " (id=" + this.getId() + ")" + " - rating=" + this.getRating() + ", comment=" + this.getComment();
	}
}
