package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true, exclude={"category"})
@Entity
public class Criteria extends VersionedObject{
	
	// TODO: add new type or categorization to handle the social competences, project performance and self defined criterias separately
	
	// Attributes
	// TODO: replace with class Locale to handle multi language support
	@NotEmpty private String label;

	// Relations
	@ManyToOne
	@JoinColumn(name="categoryId")
	@JsonIgnore
	private Category category;
	
	// Constructor
	public Criteria() {}
	
	public Criteria(String label, Language lang) {
		this.label = label;
	}
	
	public String toString() {
		return this.label;
	}
	
}
