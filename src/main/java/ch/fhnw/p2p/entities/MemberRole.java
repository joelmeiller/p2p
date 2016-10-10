package ch.fhnw.p2p.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;

@Data
@Entity
public class MemberRole extends VersionedObject {
	
	// Attributes
	private boolean active;

	// Relations
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "memberId")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "roleId")
	private Role role;

	// Constructor
	public MemberRole() {
	}

	public MemberRole(Member member, Role role) {
		this.member = member;
		this.role = role;
		this.active = true;
	}
}
