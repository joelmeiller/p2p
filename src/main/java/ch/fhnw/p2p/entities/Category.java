package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**@author Joël Meiller
  *
  *
  **/
@Data
@EqualsAndHashCode(of="id")
@Entity
public class Category extends VersionedObject {
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy="category")
	private List<Criteria> criterias;
	
	private String title;

	public Category() {
		this.criterias = new ArrayList<Criteria>();
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
