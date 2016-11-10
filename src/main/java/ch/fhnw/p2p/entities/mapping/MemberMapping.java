package ch.fhnw.p2p.entities.mapping;

import java.util.List;
import java.util.Set;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRole;
import ch.fhnw.p2p.entities.Student;
import lombok.Data;

@Data
public class MemberMapping {
	
	private Long id;
	private Student student;
	private Set<MemberRole> roles;
	

	public MemberMapping(Member member) {
		this.id = member.getId();
		this.student = member.getStudent();
		this.roles = member.getRoles();
	}
}
