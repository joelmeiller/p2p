package ch.fhnw.p2p.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ch.fhnw.p2p.entities.Student;
import ch.fhnw.p2p.repositories.StudentRepository;

/**
 * A class to test interactions with the MySQL database using the
 * StudentRepository class.
 *
 * @author Joel Meiller
 */
@Controller
@RequestMapping("/students")
public class StudentController {

	// ------------------------
	// PRIVATE FIELDS
	// ------------------------

	@Autowired
	StudentRepository studentRepository;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------

	/**
	 * /create --> Create a new Student and save it in the database.
	 * 
	 * @param email
	 *            Student's email
	 * @param firstName
	 *            Student's fist name
	 * @param lastName
	 *            Student's last name
	 * @param type
	 *            Student type (e.g. BB or full-time)
	 * @return A string describing if the Student is succesfully created or not.
	 */
	@RequestMapping("/create")
	@ResponseBody
	public String create(String firstName, String lastName, String email, String type) {
		Student student = null;
		try {
			student = new Student(firstName, lastName, email, Student.Type.BB);
			studentRepository.save(student);
		} catch (Exception ex) {
			return "Error creating the Student: " + ex.toString();
		}
		return "Student succesfully created! (id = " + student.getId() + ")";
	}

	/**
	 * /delete --> Delete the Student having the passed id.
	 * 
	 * @param id
	 *            The id of the Student to delete
	 * @return A string describing if the Student is succesfully deleted or not.
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public String delete(long id) {
		try {
			Student student = new Student(id);
			studentRepository.delete(student);
		} catch (Exception ex) {
			return "Error deleting the Student: " + ex.toString();
		}
		return "Student succesfully deleted!";
	}

	/**
	 * /get-by-email --> Return the id for the Student having the passed email.
	 * 
	 * @param email
	 *            The email to search in the database.
	 * @return The Student id or a message error if the Student is not found.
	 */
	@RequestMapping("/get-by-email")
	@ResponseBody
	public String getByEmail(String email) {
		String studentId;
		try {
			Optional<Student> student = studentRepository.findByEmail(email);
			studentId = String.valueOf(student.get().getId());
		} catch (Exception ex) {
			return "Student not found";
		}
		return "The Student id is: " + studentId;
	}

	/**
	 * /update --> Update the email and the name for the Student in the database
	 * having the passed id.
	 * 
	 * @param id
	 *            The id for the Student to update.
	 * @param email
	 *            The new email.
	 * @param name
	 *            The new name.
	 * @return A string describing if the Student is succesfully updated or not.
	 */
	@RequestMapping("/update")
	@ResponseBody
	public String updateStudent(long id, String firstName, String lastName, String email, String type) {
		try {
			Student student = studentRepository.findOne(id);
			student.setEmail(email);
			student.setFirstName(firstName);
			student.setLastName(lastName);
			student.setType(Student.Type.BB);
			studentRepository.save(student);
		} catch (Exception ex) {
			return "Error updating the Student: " + ex.toString();
		}
		return "Student succesfully updated!";
	}

}
