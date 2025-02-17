package br.pedroS.utfpr.FinesWoodW.server.controller;

import br.pedroS.utfpr.FinesWoodW.server.dto.CartItemDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.CartItem;
import br.pedroS.utfpr.FinesWoodW.server.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        return cartService.getCart(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartItemDTO cartItemDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setUserId(cartItemDTO.getUserId());
        cartItem.setProductId(cartItemDTO.getProductId());
        cartItem.setQuantity(cartItemDTO.getQuantity());

        cartService.addToCart(cartItem);
        return ResponseEntity.ok("Produto adicionado ao carrinho!");
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
        return ResponseEntity.ok("Produto removido do carrinho!");
    }
}
