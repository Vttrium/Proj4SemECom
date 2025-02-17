package br.pedroS.utfpr.FinesWoodW.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Long id;
    private Long userId;
    private Long productId;
    private int quantity;
}
