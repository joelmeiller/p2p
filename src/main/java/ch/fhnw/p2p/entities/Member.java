package ch.fhnw.p2p.entities;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.mapping.MemberRatingMapping;
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
@EqualsAndHashCode(callSuper=true, of={"student"})
@Entity
public class Member extends VersionedObject{

	// Constants
	public static enum Status {
		NEW, // Set when member is added to project by QM
		OPEN, // Set when student confirmes project participation
		FINAL, // Set when student sends the final evaluation
		ACCEPTED // Final State that proves the student accepts the rating and the mark deviation
	}

	// Attributes
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	private BigDecimal rating;
	
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	private BigDecimal deviation;
	
	// IMPORTANT: The grade will not be updated during the project life-cycle phases where the students
	// update their ratings
	// This grade will be set once the final grade for the project is set and defines the final grade
	// of the student for this project calculated by the project grade + deviation
	// During the project's duration the students only see template grades set by the QM
	@NotNull @DecimalMax("6.0") @DecimalMin("1.0")
	private BigDecimal grade;
	
	@Transient
	private int progress;

	
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "projectId")
	@JsonIgnore
	private Project project;
	
	// Relations
	@ManyToOne
    @JoinColumn(name = "userId")
	private User student;
	
	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL, mappedBy="member")
	private Set<MemberRole> roles;

	@Enumerated(EnumType.STRING)
	private Status status;

	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "sourceMember")
	@JsonIgnore
	private Set<MemberRating> memberRatings;
	@Transient
	private Set<MemberRatingMapping> ratings;
	
	// The transient fields are required for the JSON parsing but shall be ignored by hibernate
	@Transient
	private boolean added;
	private boolean removed;
	@Transient
	private boolean updated;
	@Transient
	private boolean isQM;
	
	@Transient
	private boolean canFinalize;

	// Constructor
	public Member() {
		this.status = Status.NEW;
		this.rating = new BigDecimal(0);
		this.deviation = new BigDecimal(0);
		this.grade = new BigDecimal(4.0);
		this.roles = new HashSet<MemberRole>();
		this.memberRatings = new HashSet<MemberRating>();
		this.ratings = new HashSet<MemberRatingMapping>();
		this.canFinalize = false;
	}

	public Member(Project project, User student) {
		this();
		this.project = project;
		this.student = student;
	}
	
	public Member(Project project, User student, Role role) {
		this(project, student);
		this.roles.add(new MemberRole(this, role));
	}

	public Member(Project project, User student, Role role, Set<MemberRating> memberRatings) {
		this(project, student, role);
		this.memberRatings = memberRatings;
	}
	
	/**
	 * get currently active role
	 * @return active role of member related to user
	 */
	public Role getActiveRole() {
		for (MemberRole role: this.roles) {
			if (role.isActive()) return role.getRole();
		}
		return null;
	}
	
	public void clearMemberRatings() {
		memberRatings = new HashSet<MemberRating>();
	}
	
	/**
	 * returns the REST api mapped member ratings
	 * @param Set of MemberRating Set<MemberRating>
	 * @return Set of mapped MemberRatingMapping Set<MemberRatingMapping>
	 */
	public Set<MemberRatingMapping> getRatings() {
		if (ratings.size() == 0 && memberRatings.size() > 0) {
			for (MemberRating memberRating : memberRatings) {
				ratings.add(new MemberRatingMapping(memberRating, true));
			}
		}
		return ratings;
	}

	public void setRatings(Set<MemberRating> memberRatings, boolean sourceMemberRating) {
		ratings = new HashSet<MemberRatingMapping>();
		for (MemberRating memberRating : memberRatings) {
			Member member = sourceMemberRating ? memberRating.getSourceMember() : memberRating.getTargetMember();
			if (!member.isRemoved()) {
				ratings.add(new MemberRatingMapping(memberRating, sourceMemberRating));
			}
		}
	}

	
	/**
	 * checks whether one of roles of the member is the the quality manager (QM) role with special rights
	 * @return boolean indicating if the member is referenced as QM for the current project
	 */
	public boolean isQM() {
		for (MemberRole role: roles) {
			if (role.getRole() != null && role.getRole().getType() == Role.Type.QM) return true;
		}
		return false;
	}
	
	/**
	 * checks and sets the final status of the member rating, if all member ratings
	 * are filled with valid values (not empty and not ZERO). As of this moment the user can set 
	 * the status of his member ratings to final
	 * @return boolean indicating if all member ratings are in the final status 
	 */
	public boolean checkAndSetFinalRatings() {
		Double finalRating = 0.0;
		int ratingCount = 0;

		for (MemberRating rating : this.memberRatings) {
			for (CriteriaRating criteriaRating : rating.getCriteriaRatings()) {
				if (criteriaRating.getRating().compareTo(BigDecimal.ZERO) == 0)
					return false;
				finalRating += criteriaRating.getRating().doubleValue();
			}

			ratingCount += rating.getCriteriaRatings().size();
			
			if (rating.getStatus() != MemberRating.Status.FINAL) return false;
		}
		
		if (ratingCount > 0) {
			this.rating = new BigDecimal(finalRating / ratingCount);
		}
		
		this.canFinalize = true;
		
		return true;
	}
	
	public Member clone() {
		Member member = new Member(this.project, this.student);
		member.setId(this.id);
		member.setStatus(this.status);
		member.setRoles(this.roles);
		member.setGrade(this.grade);
		member.setDeviation(this.deviation);
		member.setRemoved(this.removed);
		member.setRating(this.rating);
		
		return member;
	}
	
	public String toString() {
		return this.getClass() + " (id=" + this.getId() + ")";
	}
}
