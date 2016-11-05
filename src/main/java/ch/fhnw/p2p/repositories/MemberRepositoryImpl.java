package ch.fhnw.p2p.repositories;

import org.springframework.beans.factory.annotation.Autowired;

import ch.fhnw.p2p.entities.Member;

public class MemberRepositoryImpl {

	@Autowired
	StudentRepository studentRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
//	public Member findByUserEmail(String email) {
//		Member member = memberRepository.findByStudent(studentRepository.findByEmail(email));
//	}
}
