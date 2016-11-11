package ch.fhnw.p2p.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;


import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import ch.fhnw.p2p.utils.Slug;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
public class Coach extends VersionedObject {

	@NotEmpty
	private String firstName;
	@NotEmpty
	private String lastName;
	@NotEmpty
	@Email
	@Column(unique = true)
	private String email;

	private String slug;

	public Coach() {
	}

	public Coach(long id) {
		this.id = id;
	}

	public Coach(String firstName, String lastName, String email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.slug = Slug.makeSlugFromEmail(email);
	}

	public String toString() {
		return firstName + " " + lastName;
	}
}
