package ch.fhnw.p2p.entities.mixins;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import lombok.Data;

@Data
@MappedSuperclass
public abstract class VersionedObject extends Versioning {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	protected Long id;
	
}
