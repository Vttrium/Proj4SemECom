package br.pedroS.utfpr.FinesWoodW.server.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemsDTO {
    private Long id;

    @NotNull
    private Integer quantity;

    @NotNull
    private BigDecimal price;

    private ProductDTO product;

    private OrderDTO order;
}
