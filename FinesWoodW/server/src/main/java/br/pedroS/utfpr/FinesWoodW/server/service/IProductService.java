package br.pedroS.utfpr.FinesWoodW.server.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.pedroS.utfpr.FinesWoodW.server.model.Product;

public interface IProductService extends ICrudService<Product, Long> {
    Page<Product> filterProductsPaginated(Long categoryId, Long themeId, Double minPrice, Double maxPrice, Pageable pageable);
}
