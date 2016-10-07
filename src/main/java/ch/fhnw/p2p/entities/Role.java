package ch.fhnw.p2p.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Data;


/**
 * Entity Role
 * 
 * @author Joel Meiller
 *
 */
@Data
@Entity
@Table(name = "tbl-role")
public class Role {

	// Constants
	public static enum Type {
		QM, OTHER,
	}

	public static enum Status {
		ACTIVE, OLD,
	}

	// Attributes
	@Id
	@GeneratedValue
	private Long id;

	@Enumerated(EnumType.STRING)
	private Type type;

	@Enumerated(EnumType.STRING)
	private Status status;

	private String shortText;
	private String longText;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "roles")
	private Set<Member> members;

	// Constructor
	public Role() {
	}

	public Role(long id) {
		this.id = id;
	}

	public Role(Type type) {
		this.status = Status.OLD;
	}
}
