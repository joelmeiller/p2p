package ch.fhnw.p2p.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.User;

@Transactional
public interface MemberRepository extends JpaRepository<Member, Long> {

	Member findByStudentEmail(String email);
}
