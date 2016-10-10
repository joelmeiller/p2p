package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Project.Status;

@Transactional
public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	// Project findFirstByMemberAndStatus(Member member, Status status);
}
