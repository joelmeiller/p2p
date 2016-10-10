package ch.fhnw.p2p.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;

@Data
@Entity
public class ProjectCriteria extends VersionedObject {
	
	// TODO: Is actually a unidirectional ManyToMany relation and could be refactored
	
	// Relations
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "projectId")
	private Project project;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "criteriaId")
	private Criteria criteria;


	// Constructor
	public ProjectCriteria() {};
	
	public ProjectCriteria(Project project, Criteria criteria) {
		this.project = project;
		this.criteria = criteria;
	}
}
