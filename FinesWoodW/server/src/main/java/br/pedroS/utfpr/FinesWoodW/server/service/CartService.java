package br.pedroS.utfpr.FinesWoodW.server.service;

import br.pedroS.utfpr.FinesWoodW.server.model.CartItem;
import br.pedroS.utfpr.FinesWoodW.server.repository.CartRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public List<CartItem> getCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void addToCart(CartItem cartItem) {
        cartRepository.save(cartItem);
    }

    public void removeFromCart(Long id) {
        cartRepository.deleteById(id);
    }
}

