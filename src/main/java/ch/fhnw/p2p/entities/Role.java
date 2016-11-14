package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * Entity Role
 * 
 * @author Joel Meiller
 *
 */
@Data
@EqualsAndHashCode(callSuper=false)
@Entity
public class Role extends VersionedObject {

	// Constants
	public static enum Type {
		QM, OTHER,
	}

	// Attributes
	@Enumerated(EnumType.STRING)
	private Type type;

	private String title;
	private String shortcut;

	// Constructor
	public Role() {
		this.type = Type.OTHER;
	}

	public Role(long id) {
		this.id = id;
		this.type = Type.OTHER;
	}

	
	public Role(String title, String shortcut, Locale.Language lang) {
		this.title = title;
		this.shortcut = shortcut;
		this.type = Type.OTHER;
	}
	
	public Role(String title, String shortcut, Boolean isQM, Locale.Language lang) {
		this(title, shortcut, lang);
		this.type = (isQM ? Type.QM : Type.OTHER);
	}
	
	public String toString(Locale.Language lang) {
		return this.getTitle(lang) + "(" + this.getShortcut(lang) + ")" + (this.type == Type.QM ? ", marked as Quality Manager" : "");
	}
	
	public String getTitle(Locale.Language lang) {
		return this.title;
	}
	
	public String getShortcut(Locale.Language lang) {
		return this.shortcut;
	}
}
