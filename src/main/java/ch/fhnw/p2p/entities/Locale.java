package ch.fhnw.p2p.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import ch.fhnw.p2p.entities.mixins.Versioning;
import lombok.Data;

@Data
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
