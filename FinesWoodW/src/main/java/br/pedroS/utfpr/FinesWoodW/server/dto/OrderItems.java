package br.pedroS.utfpr.FinesWoodW.server.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public class OrderItems {
    private Long id;

    @NotNull
    private Integer quantity;

    @NotNull
    private BigDecimal price;

    private ProductDTO product;

    private OrderDTO order;
}
