package ch.fhnw.p2p.entities;

import java.util.HashSet;
import java.util.Set;

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

@Data
@EqualsAndHashCode(callSuper=true, exclude={"projectCriterias", "project"})
@Entity
public class ProjectCategory extends VersionedObject {
	
	// TODO: Is actually a unidirectional ManyToMany relation and could be refactored
	
	// Relations
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "projectId")
	@JsonIgnore
	private Project project;

	@ManyToOne
	@JoinColumn(name = "categoryId")
	private Category category;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="category", orphanRemoval=true)
	private Set<ProjectCriteria> projectCriterias;
	
	// Constructor
	public ProjectCategory() {
		this.projectCriterias = new HashSet<ProjectCriteria>();
	};
	
	public ProjectCategory(Category category) {
		this();
		this.category = category;
	}
}
