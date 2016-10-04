package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Student {

	private @Id @GeneratedValue Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String studentType;

	@SuppressWarnings("unused")
	private Student() {}

	public Student(String firstName, String lastName, String email, String studentType) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.studentType = studentType;
	}
}
