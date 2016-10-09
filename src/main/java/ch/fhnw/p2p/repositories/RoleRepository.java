package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import ch.fhnw.p2p.entities.Role;

@Transactional
public interface RoleRepository extends CrudRepository<Role, Long> {
	
}