package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**@author Joël Meiller
  *
  *
  **/
@Data
@Entity
@Table(name = "tbl-category")
public class Category {

  // Constants
  public static enum Type {
    MEMBER,
    RATING,
  }

  public static enum Status {
    OPEN,
    READONLY,
  }

  // Attributes
  @Id
  @GeneratedValue
	private Long id;

  @Enumerated(STRING)
  private Type type;

	@Enumerated(STRING)
  private Status status;

  // Attributs that are set only if member type = MEMBER
  private double rating;

  // Attributs that are set only if member type = RATING
  private String comment;


  // Relations
  @OneToMany(mappedBy="member")
  private Set<Criteria> criterias;

  @OneToMany(mappedBy="member")
  private Set<Role> roles;


  // Constructor
	public Category() {}

	public Cateogry(long id) {
		this.id = id;
	}

	public Category(Type type, Set<Criteria> criterias) {
		this.status = Status.OPEN;
    this.criterias = criterias;
	}
}
