package br.pedroS.utfpr.FinesWoodW.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.pedroS.utfpr.FinesWoodW.server.model.Category;
import br.pedroS.utfpr.FinesWoodW.server.repository.CategoryRepository;
import br.pedroS.utfpr.FinesWoodW.server.service.ICategoryService;

import java.util.List;

@Service
public class CategoryServiceImpl extends CrudServiceImpl<Category, Long>
        implements ICategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    protected JpaRepository<Category, Long> getRepository() {
        return categoryRepository;
    }

    @Override
    public List<Category> findByName(String name) {
        return categoryRepository.findByNameContaining(name);
    }
}
//    private final CategoryRepository categoryRepository;
//
//    public CategoryServiceImpl(CategoryRepository categoryRepository) {
//        this.categoryRepository = categoryRepository;
//    }
//
//    @Override
//    public List<Category> findAll() {
//        return categoryRepository.findAll();
//    }
//
//    @Override
//    public Page<Category> findAll(Pageable pageable) {
//        return categoryRepository.findAll(pageable);
//    }
//
//    @Override
//    public Category save(Category category) {
//        return categoryRepository.save(category);
//    }
//
//    @Override
//    public Category findById(Long id) {
//        return categoryRepository.findById(id).orElse(null);
//    }
//
//    @Override
//    public boolean exists(Long id) {
//        return categoryRepository.existsById(id);
//    }
//
//    @Override
//    public long count() {
//        return categoryRepository.count();
//    }
//
//    @Override
//    public void delete(Long id) {
//        categoryRepository.deleteById(id);
//    }
//}
