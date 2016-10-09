package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;


/**
 * Entity Role
 * 
 * @author Joel Meiller
 *
 */
@Data
@Entity
public class Role {

	// Constants
	public static enum Type {
		QM, OTHER,
	}

	// Attributes
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	
	@Enumerated(EnumType.STRING)
	private Type type;

	private String shortText;
	private String longText;

//	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "roles")
//	private Set<Member> members;

	// Constructor
	public Role() {
		this.type = Type.OTHER;
	}

	public Role(long id) {
		this.id = id;
		this.type = Type.OTHER;
	}

	
	public Role(String longText, String shortText) {
		this.longText = longText;
		this.shortText = shortText;
		this.type = Type.OTHER;
	}
	
	public Role(String longText, String shortText, Type type) {
		this.shortText = shortText;
		this.longText = longText;
		this.type = type;
	}
}
