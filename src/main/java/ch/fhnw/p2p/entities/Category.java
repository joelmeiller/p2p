package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**@author Joël Meiller
  *
  *
  **/
@Data
@EqualsAndHashCode(callSuper=true, exclude={"criterias"})
@Entity
public class Category extends VersionedObject {
	
	// Constants
	public enum Type {
		PREDEFINED,
		SELFDEFINED,
	}
	
	// Attributes
	private String title;
	@Enumerated(EnumType.STRING)
	private Type type;
	
	// Relations
	@OneToMany(cascade = CascadeType.ALL, mappedBy="category")
	private List<Criteria> criterias;
	
	
	public Category() {
		this.criterias = new ArrayList<Criteria>();
		this.type = Type.PREDEFINED;
	}

	public Category(String title, Language lang) {
		this();
		this.title = title;
	}
	
	public Category(String title, List<Criteria> criterias, Language lang) {
		this(title, lang);
		this.criterias = criterias;
	}
	
	public String getTitle(Locale.Language lang) {
		return this.title;
	}
	
	public String toString() {
		return this.title;
	}
}
