package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;

/**@author Joël Meiller
  *
  *
  **/
@Data
@Entity
public class Category extends VersionedObject {

	@ManyToOne
	@JoinColumn(name="projectId")
	private Project project;
	
	@OneToMany(mappedBy="category")
	private List<Criteria> criterias;
	
	@OneToMany
	@JoinColumn(name="localeId")
	private List<Locale> title;

	public Category() {}

	public Category(String text, Language lang) {
		this.title.add(new Locale (text, lang));
	}
	
	public String getTitle(Locale.Language lang) {
		for(Locale locale: this.title) {
			if (locale.getLang() == lang) return locale.getText();
		}
		return "";
	}
}
