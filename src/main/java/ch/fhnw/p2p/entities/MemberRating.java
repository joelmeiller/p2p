package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;

@Data
@Entity
public class MemberRating extends VersionedObject {

	// Attributes
	private double rating;
	private String comment;

	// Relations
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "sourceMemberId")
	private Member sourceMember;

	// Relations
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "targetMemberId")
	private Member targetMember;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "memberRating")
	private List<CriteriaRating> criteriaRatings;

	// Constructor
	public MemberRating() {
		this.criteriaRatings = new ArrayList<CriteriaRating>();
		this.rating = 0;
	};

	public MemberRating(Member source, Member target) {
		this();
		this.sourceMember = source;
		this.targetMember = target;
	}

	public MemberRating(Member source, Member target, List<Criteria> criterias) {
		this(source, target);

		for (Criteria criteria : criterias) {
			this.criteriaRatings.add(new CriteriaRating(criteria));
		}
	}
}
