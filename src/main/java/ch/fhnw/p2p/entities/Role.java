package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import ch.fhnw.p2p.entities.mixins.Versioning;
import lombok.Data;


/**
 * Entity Role
 * 
 * @author Joel Meiller
 *
 */
@Data
@Entity
public class Role extends Versioning {

	// Constants
	public static enum Type {
		QM, OTHER,
	}

	// Attributes
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	
	@Enumerated(EnumType.STRING)
	private Type type;

	private String shortcut;
	private String title;

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

	
	public Role(String title, String shortcut) {
		this.title = title;
		this.shortcut = shortcut;
		this.type = Type.OTHER;
	}
	
	public Role(String title, String shortcut, Boolean isQM ) {
		this.shortcut = shortcut;
		this.title = title;
		this.type = (isQM ? Type.QM : Type.OTHER);
	}
	
	public String toString() {
		return this.title + "(" + this.shortcut + ")" + (this.type == Type.QM ? ", marked as Quality Manager" : "");
	}
}
