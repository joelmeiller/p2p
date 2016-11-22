package ch.fhnw.p2p.entities.mixins;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false, of="id")
@MappedSuperclass
public abstract class VersionedObject extends Versioning {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	protected Long id;
	
}
