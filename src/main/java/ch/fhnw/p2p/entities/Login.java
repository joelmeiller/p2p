package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
@Entity
public class Login extends VersionedObject {
	private String ticket;
	private String email;
}
