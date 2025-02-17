package br.pedroS.utfpr.FinesWoodW.server.dto;

import java.math.BigDecimal;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private Long Id;
    private Long userId;
    private Long productId;
    private String name;
    private BigDecimal price;
    private String imageUrl;
    private int quantity;
}
