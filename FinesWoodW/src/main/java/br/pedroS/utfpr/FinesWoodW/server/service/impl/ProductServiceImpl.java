package br.pedroS.utfpr.FinesWoodW.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.pedroS.utfpr.FinesWoodW.server.model.Product;
import br.pedroS.utfpr.FinesWoodW.server.repository.ProductRepository;
import br.pedroS.utfpr.FinesWoodW.server.service.IProductService;

@Service
public class ProductServiceImpl extends CrudServiceImpl<Product, Long> implements IProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    protected JpaRepository<Product, Long> getRepository() {
        return productRepository;
    }
}