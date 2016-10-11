package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
public class ProjectCategory extends VersionedObject {
	
	// TODO: Is actually a unidirectional ManyToMany relation and could be refactored
	
	// Relations
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "projectId")
	@JsonIgnore
	private Project project;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "categoryId")
	private Category category;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy="category")
	private List<Criteria> criterias;
	
	// Constructor
	public ProjectCategory() {
		this.criterias = new ArrayList<Criteria>();
	};
	
	public ProjectCategory(Category category) {
		this();
		this.category = category;
		this.criterias = category.getCriterias();
	}
}
