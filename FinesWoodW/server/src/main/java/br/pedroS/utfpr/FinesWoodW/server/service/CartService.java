import org.springframework.stereotype.Service;

import br.pedroS.utfpr.FinesWoodW.server.dto.CartItemDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.CartItem;
import br.pedroS.utfpr.FinesWoodW.server.model.Product;
import br.pedroS.utfpr.FinesWoodW.server.repository.CartRepository;
import br.pedroS.utfpr.FinesWoodW.server.repository.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public List<CartItemDTO> getCart(Long userId) {
        List<CartItem> cartItems = cartRepository.findByUserId(userId);

        return cartItems.stream().map(cartItem -> {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            CartItemDTO dto = new CartItemDTO();
            dto.setId(cartItem.getId());
            dto.setUserId(cartItem.getUserId());
            dto.setProductId(cartItem.getProductId());
            dto.setName(product.getName());
            dto.setPrice(product.getPrice());
            dto.setImageUrl(product.getUrlImage());
            dto.setQuantity(cartItem.getQuantity());

            return dto;
        }).collect(Collectors.toList());
    }
}
