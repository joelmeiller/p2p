package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.Category;

@Transactional
public interface CategoryRepository extends JpaRepository<Category, Long>{

}
