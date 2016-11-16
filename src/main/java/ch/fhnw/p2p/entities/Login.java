package ch.fhnw.p2p.entities;

import javax.persistence.Entity;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false, exclude={"email"})
@Entity
public class Login extends VersionedObject {

	String email;
	
	public Login() {}
	
	public Login(String mail) {
		if (mail == null) mail = "Not found";
		this.email =  mail;
	}
}
