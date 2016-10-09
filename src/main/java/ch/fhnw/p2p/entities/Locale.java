package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
public class Locale {
	
	public static enum Language {
		DE,
		EN,
	};

	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	private String text;
	private Language lang;
	
	public Locale() {}

	public Locale(String text, Language lang) {
		this.text = text;
		this.lang = lang;
	}
}
