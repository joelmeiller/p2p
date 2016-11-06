package ch.fhnw.p2p.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import ch.fhnw.p2p.utils.Slug;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
public class Student extends VersionedObject {
	
	public static enum Type {
		BB,
		FULLTIME,
		PARTTIME,
	};	

	
	@NotEmpty private String firstName;
	@NotEmpty private String lastName;
	@NotEmpty @Email @Column(unique=true) private String email;	
	@Enumerated(EnumType.STRING) private Type type;
	
	private String slug;

	public Student() {}

	public Student(long id) {
		this.id = id;
		this.type = Type.FULLTIME;
	}

	public Student(String firstName, String lastName, String email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.type = Type.FULLTIME;
		this.slug = Slug.makeSlugFromEmail(email);
	}
	
	public Student(String firstName, String lastName, String email, Type type) {
		this(firstName, lastName, email);
		this.type = type;
	}
	
	public String toString() {
		return firstName + " " + lastName;
	}
}
