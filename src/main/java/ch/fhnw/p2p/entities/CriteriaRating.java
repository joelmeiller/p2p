package ch.fhnw.p2p.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "tbl-criteria-rating")
public class CriteriaRating {

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
	public CriteriaRating() {
	}

	public CriteriaRating(Criteria criteria) {
		this.criteria = criteria;
	}

	public CriteriaRating(Criteria criteria, double rating) {
		this.criteria = criteria;
		this.rating = rating;
	}
}
