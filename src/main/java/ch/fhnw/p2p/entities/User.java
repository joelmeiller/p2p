package ch.fhnw.p2p.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Transient;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import ch.fhnw.p2p.utils.Slug;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true, exclude={"member"})
@Entity
public class User extends VersionedObject {
	
	public static enum Type {
		STUDENT,
		COACH,
	};
	
	public static enum StudentType {
		BB,
		FULLTIME,
		PARTTIME,
	};
	
	public static enum Status {
		FREE, // can be added to a new project
		ALLOCATED, // is already allocated to a project
	}

	
	@NotEmpty private String firstName;
	@NotEmpty private String lastName;
	@NotEmpty @Email @Column(unique=true) private String email;	
	@Enumerated(EnumType.STRING) private Type type;
	@Enumerated(EnumType.STRING) private StudentType studentType;
	@Enumerated(EnumType.STRING) private Status status;
	
	private String slug;
	
	@Transient 
	@JsonIgnore
	private Member member;

	public User() {
		this.type = Type.STUDENT;
		this.studentType = StudentType.FULLTIME;
		this.status = Status.FREE;
	}

	public User(long id) {
		this();
		this.id = id;
	}

	public User(String firstName, String lastName, String email) {
		this();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.slug = Slug.makeSlugFromEmail(email);
	}
	
	public User(String firstName, String lastName, String email, Type type) {
		this(firstName, lastName, email);
		this.type = type;
	}
	
	public User(String firstName, String lastName, String email, Type type, StudentType studentType) {
		this(firstName, lastName, email, type);
		this.studentType = studentType;
	}
	
	
	public String toString() {
		return firstName + " " + lastName + " (" + id + ")" + ", " + type;
	}
	
	/**
	 * checks whether one of roles of the member is the the quality manager (QM) role with special rights
	 * @return boolean indicating if the user is referenced as QM for the current project
	 */
	public boolean isQM() {
		if (member == null) return false;
		return member.isQM();
	}
	
	/**
	 * checks whether the user is a coach
	 * @return boolean indicating if the user is a coach
	 */
	public boolean isCoach() {
		return this.type == Type.COACH;
	}
}
