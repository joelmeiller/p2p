package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.Login;


@Transactional
public interface LoginRepository extends JpaRepository<Login, Long> {

}