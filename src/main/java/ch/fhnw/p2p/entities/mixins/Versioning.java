package ch.fhnw.p2p.entities.mixins;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@MappedSuperclass
public abstract class Versioning {
	
	@Version
	@JsonIgnore
	private Integer version;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    @JsonIgnore
    private Date versionTSD;
    
    @JsonIgnore
    private String createdBy;

    @PrePersist
    protected void onCreate() {
    	this.versionTSD = new Date();
    }
}
