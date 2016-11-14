package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.Coach;
import ch.fhnw.p2p.entities.Member;

@Transactional
public interface CoachRepository extends JpaRepository<Coach, Long> {

	Member findByEmail(String email);
}
