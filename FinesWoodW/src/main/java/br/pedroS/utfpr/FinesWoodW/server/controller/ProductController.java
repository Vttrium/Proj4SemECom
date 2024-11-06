package br.pedroS.utfpr.FinesWoodW.server.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.ProductDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Product;
import br.pedroS.utfpr.FinesWoodW.server.service.ICrudService;
import br.pedroS.utfpr.FinesWoodW.server.service.IProductService;

@RestController
@RequestMapping("products")
public class ProductController extends CrudController<Product, ProductDTO, Long> {
    private static IProductService productService;
    private static ModelMapper modelMapper;

    public ProductController(IProductService productService, ModelMapper modelMapper) {
        super(Product.class, ProductDTO.class);
        ProductController.productService = productService;
        ProductController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Product, Long> getService() {
        return productService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
