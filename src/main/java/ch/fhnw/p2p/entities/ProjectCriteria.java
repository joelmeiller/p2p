package ch.fhnw.p2p.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
public class ProjectCriteria extends VersionedObject {
	
	// TODO: Is actually a unidirectional ManyToMany relation and could be refactored
	
	// Relations
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "categoryId")
	@JsonIgnore
	private Category category;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "criteriaId")
	@JsonIgnore
	private Criteria criteria;


	// Constructor
	public ProjectCriteria() {};
	
	public ProjectCriteria(Criteria criteria) {
		this.criteria = criteria;
	}
}
