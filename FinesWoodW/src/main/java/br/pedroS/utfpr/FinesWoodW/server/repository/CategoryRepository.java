package br.pedroS.utfpr.FinesWoodW.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pedroS.utfpr.FinesWoodW.server.model.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByNameContaining(String name);

}
