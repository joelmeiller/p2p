package ch.fhnw.p2p.entities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity Member
 * 
 * @author Joël Meiller
 *
 *
 **/

@Data
@EqualsAndHashCode(of="id")
@Entity
public class Member extends VersionedObject{

	// Constants
	public static enum Status {
		NEW, // Set when member is added to project by QM
		OPEN, // Set when student confirmes project participation
		READONLY, // Set when student sends the final evaluation
	}

	// Attributes
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	private BigDecimal rating;
	
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	private BigDecimal deviation;

	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "projectId")
	@JsonIgnore
	private Project project;
	
	// Relations
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "studentId")
	private Student student;
	
	@OneToMany(mappedBy="member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<MemberRole> roles;

	@Enumerated(EnumType.STRING)
	private Status status;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "sourceMember")
	private List<MemberRating> memberRatings;


	// Constructor
	public Member() {
		this.status = Status.NEW;
		this.rating = new BigDecimal(0);
		this.deviation = new BigDecimal(0);
		this.roles = new ArrayList<MemberRole>();
		this.memberRatings = new ArrayList<MemberRating>();
	}

	public Member(Project project, Student student) {
		this();
		this.project = project;
		this.student = student;
	}
	
	public Member(Project project, Student student, Role role) {
		this(project, student);
		this.roles.add(new MemberRole(this, role));
	}

	public Member(Project project, Student student, Role role, List<MemberRating> memberRatings) {
		this(project, student, role);
		this.memberRatings = memberRatings;
	}
}
