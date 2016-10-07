package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import ch.fhnw.p2p.utils.Slug;
import lombok.Data;

@Data
@Entity
@Table(name = "tbl-criteria")
public class Criteria {
	
	

	private @Id @GeneratedValue Long id;
	private String label;
	private LANG lang;
	private String slug;

	public Criteria() {}

	public Criteria(long id) {
		this.id = id;
	}

	public Criteria(String label, String lastName, String email, String CriteriaType) {
		this.label = label;
		this.slug = Slug.makeSlug(email);
	}
}
