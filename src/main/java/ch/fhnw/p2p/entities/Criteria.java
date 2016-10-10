package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;

@Data
@Entity
public class Criteria extends VersionedObject{
	
	// Attributes
	private String label;

	// Relations
	@ManyToOne
	@JoinColumn(name="categoryId")
	private Category category;
	
	// Constructor
	public Criteria() {}
	
	public Criteria(String label, Language lang) {
		this.label = label;
	}
	
}
