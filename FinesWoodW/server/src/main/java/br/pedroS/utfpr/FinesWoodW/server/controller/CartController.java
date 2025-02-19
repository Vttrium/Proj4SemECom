package br.pedroS.utfpr.FinesWoodW.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.CartDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Cart;
import br.pedroS.utfpr.FinesWoodW.server.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> getCartByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody CartDTO cartDTO) {
        Cart addedItem = cartService.addToCart(cartDTO.getUserId(), cartDTO.getProductId(), cartDTO.getQuantity());
        return ResponseEntity.ok(addedItem);
    }

    @PutMapping("/update/{cartId}")
    public ResponseEntity<Void> updateCart(@PathVariable Long cartId, @RequestBody int quantity) {
        cartService.updateCart(cartId, quantity);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartId) {
        cartService.removeFromCart(cartId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/merge/{userId}")
    public ResponseEntity<Void> mergeLocalCart(@PathVariable Long userId, @RequestBody List<CartDTO> localCartItems) {
        cartService.mergeLocalCartToUser(userId, localCartItems);
        return ResponseEntity.ok().build();
    }
}
