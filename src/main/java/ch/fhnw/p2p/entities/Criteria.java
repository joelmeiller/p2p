package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;

@Data
@Entity
public class Criteria extends VersionedObject{
	
	@ManyToOne
	@JoinColumn(name="categoryId")
	private Category category;
	
	@OneToMany
	@JoinColumn(name="localeId")
	private List<Locale> label;

	public Criteria() {}

	public Criteria(long id) {
		this.id = id;
	}

	public Criteria(String text, Language lang) {
		this.label.add(new Locale (text, lang));
	}
	
	

	public String getLabel(Locale.Language lang) {
		for(Locale locale: this.label) {
			if (locale.getLang() == lang) return locale.getText();
		}
		return "";
	}
}
