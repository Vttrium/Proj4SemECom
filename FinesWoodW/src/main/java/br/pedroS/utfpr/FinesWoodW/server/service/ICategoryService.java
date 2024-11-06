package br.pedroS.utfpr.FinesWoodW.server.service;

import java.util.List;

public interface ICategoryService extends
        ICrudService<Category, Long> {

    List<Category> findByName(String name);
}

//    List<Category> findAll();
//    Page<Category> findAll(Pageable pageable);
//    Category save(Category category);
//    Category findById(Long id);
//    boolean exists(Long id);
//    long count();
//    void delete(Long id);
//}
