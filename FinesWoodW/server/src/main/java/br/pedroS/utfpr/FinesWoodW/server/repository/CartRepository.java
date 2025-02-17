package br.pedroS.utfpr.FinesWoodW.server.repository;


import br.pedroS.utfpr.FinesWoodW.server.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
}

