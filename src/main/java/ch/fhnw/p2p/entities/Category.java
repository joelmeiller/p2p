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

/**@author Joël Meiller
  *
  *
  **/
@Data
@Entity
public class Category {

	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	
	@ManyToOne
	@JoinColumn(name="projectId")
	private Project project;
	
	@OneToMany(mappedBy="category")
	private Set<Criteria> criterias;
	
	@OneToMany
	@JoinColumn(name="localeId")
	private Set<Locale> title = new HashSet<Locale>();

	public Category() {}

	public Category(String text, Language lang) {
		this.title.add(new Locale (text, lang));
	}
}
