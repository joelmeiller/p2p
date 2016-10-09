package ch.fhnw.p2p.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

/**@author Joël Meiller
  *
  *
  **/
@Data
@Entity
public class Project {

	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	
	@OneToMany(mappedBy="project")
	private Set<Category> categories = new HashSet<Category>();
	
	@OneToMany(mappedBy="project")
	private Set<Member> members = new HashSet<Member>();

	public Project() {}
}
