package ch.fhnw.p2p.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;

@Data
@Entity
public class MemberRating extends VersionedObject {
	
	// Attributes
	private double rating;

	// Relations
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "memberId")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "criteriaId")
	private Criteria criteria;

	// Constructor
	public MemberRating(Criteria criteria, Member member) {
		this.criteria = criteria;
		this.member = member;
	}
}
