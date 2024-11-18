package br.pedroS.utfpr.FinesWoodW.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.pedroS.utfpr.FinesWoodW.server.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByThemeId(Long themeId);

    @Query("SELECT p FROM Product p JOIN p.theme t WHERE "
      + "(:categoryId IS NULL OR p.category.id IN :categoryIds) AND "
      + "(:minPrice IS NULL OR p.price >= :minPrice) AND "
      + "(:maxPrice IS NULL OR p.price <= :maxPrice) AND "
      + "(:themeId IS NULL OR t.id IN :themeId)")

    Page<Product> findFilteredProductsPaginated(
        @Param("categoryId") Long categoryId,
        @Param("themeId") Long themeId,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        Pageable pageable);
}
