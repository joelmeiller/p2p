package ch.fhnw.p2p.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(of="id")
@Entity
public class ProjectCriteria extends VersionedObject {
	
	// TODO: Is actually a unidirectional ManyToMany relation and could be refactored
	
	// Relations
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "categoryId")
	@JsonIgnore
	private ProjectCategory category;

	@ManyToOne
	@JoinColumn(name = "criteriaId")
	private Criteria criteria;

	@Transient
	private boolean added;
	@Transient
	private boolean removed;
	@Transient
	private boolean updated;

	// Constructor
	public ProjectCriteria() {};
	
	public ProjectCriteria(Criteria criteria) {
		this.criteria = criteria;
	}
}
