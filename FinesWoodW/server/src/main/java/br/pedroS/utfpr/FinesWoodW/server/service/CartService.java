package br.pedroS.utfpr.FinesWoodW.server.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.pedroS.utfpr.FinesWoodW.server.dto.CartDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Cart;
import br.pedroS.utfpr.FinesWoodW.server.repository.CartRepository;
import br.pedroS.utfpr.FinesWoodW.server.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    public List<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }

    public Cart addToCart(Long userId, Long productId, int quantity) {
        Cart cartItem = new Cart();
        cartItem.setUser(userRepository.findById(userId).orElse(null));
        cartItem.setProductId(productId);
        cartItem.setQuantity(quantity);
        return cartRepository.save(cartItem);
    }

    @Transactional
    public void updateCart(Long cartId, int quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        optionalCart.ifPresent(cart -> {
            cart.setQuantity(quantity);
            cartRepository.save(cart);
        });
    }

    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    @Transactional
    public void mergeLocalCartToUser(Long userId, List<CartDTO> localCartItems) {
        List<Cart> existingCart = cartRepository.findByUserId(userId);

        for (CartDTO localItem : localCartItems) {
            boolean exists = existingCart.stream()
                .anyMatch(item -> item.getProductId().equals(localItem.getProductId()));

            if (!exists) {
                addToCart(userId, localItem.getProductId(), localItem.getQuantity());
            }
        }
    }
}
