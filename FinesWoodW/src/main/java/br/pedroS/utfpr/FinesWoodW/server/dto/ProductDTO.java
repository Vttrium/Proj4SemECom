package br.pedroS.utfpr.FinesWoodW.server.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class ProductDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String description;

    @NotNull
    private BigDecimal price;

    private CategoryDTO category;

    private ThemeDTO theme;
}
