package ch.fhnw.p2p.entities.mixins;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
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
    private Date createdTSD;
    @JsonIgnore
    private String createdBy;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    @JsonIgnore
    private Date updatedTSD;
    @JsonIgnore
    private String updatedBy;

    @PrePersist
    protected void onCreate() {
    	this.createdTSD = new Date();
    	// TODO: set current user.id for createdBy
    }
    
    @PreUpdate
    protected void onUpdate() {
    	this.updatedTSD = new Date();
    	// TODO: set current user.id for createdBy
    }
}
