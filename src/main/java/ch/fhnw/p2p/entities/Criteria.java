package ch.fhnw.p2p.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import ch.fhnw.p2p.entities.Locale.Language;

import lombok.Data;

@Data
@Entity
public class Criteria {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	
	@ManyToOne
	@JoinColumn(name="categoryId")
	private Category category;
	
	@OneToMany
	@JoinColumn(name="localeId")
	private Set<Locale> label = new HashSet<Locale>();

	public Criteria() {}

	public Criteria(long id) {
		this.id = id;
	}

	public Criteria(String text, Language lang) {
		this.label.add(new Locale (text, lang));
	}
}
