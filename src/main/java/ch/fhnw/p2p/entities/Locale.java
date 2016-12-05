package ch.fhnw.p2p.entities;

import javax.persistence.Entity;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
public class Locale extends VersionedObject {
	
	public static enum Language {
		DE,
		EN,
	};
	
	
	private Long textId;
	private Language lang;
	

	private String text;
	
	public Locale() {
	}
	
	public Locale(String text, Language lang) {
		this.text = text;
		this.lang = lang;
	}
	
	public Locale(Long id, String text, Language lang) {
		this.id = id;
		this.text = text;
		this.lang = lang;
	}
}
