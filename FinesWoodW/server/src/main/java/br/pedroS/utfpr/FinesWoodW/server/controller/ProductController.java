package br.pedroS.utfpr.FinesWoodW.server.controller;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.ProductDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Product;
import br.pedroS.utfpr.FinesWoodW.server.service.ICrudService;
import br.pedroS.utfpr.FinesWoodW.server.service.IProductService;

@RestController
@RequestMapping("products")
public class ProductController extends CrudController<Product, ProductDTO, Long> {
    private final IProductService productService;
    private final ModelMapper modelMapper;

    public ProductController(IProductService productService, ModelMapper modelMapper) {
        super(Product.class, ProductDTO.class);
        this.productService = productService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Product, Long> getService() {
        return productService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
    
    @GetMapping("search")
    public ResponseEntity<Page<ProductDTO>> searchProducts(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String order,
            @RequestParam(required = false) Boolean asc,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long themeId,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        PageRequest pageRequest = PageRequest.of(page, size);
        if (order != null && asc != null) {
            pageRequest = PageRequest.of(page, size,
                    asc ? Sort.Direction.ASC : Sort.Direction.DESC, order);
        }

        Page<ProductDTO> filteredProducts = productService.filterProductsPaginated(
                categoryId, themeId, minPrice, maxPrice, pageRequest)
                .map(this::convertToDto);

        return ResponseEntity.ok(filteredProducts);
    }

    private ProductDTO convertToDto(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }
}
