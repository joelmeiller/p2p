package ch.fhnw.p2p.entities.mixins;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import lombok.Data;

@Data
@MappedSuperclass
public abstract class Versioning {
	
	@Version
	private Integer version;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date versionTSD;
    
    private String createdBy;

    @PrePersist
    protected void onCreate() {
    	this.versionTSD = new Date();
    }
}
