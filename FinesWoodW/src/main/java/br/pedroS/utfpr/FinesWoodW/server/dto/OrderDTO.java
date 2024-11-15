package br.pedroS.utfpr.FinesWoodW.server.dto;

import jakarta.validation.constraints.NotNull;

public class OrderDTO {

    private Long id;

    @NotNull
    private String payMethod;

    @NotNull
    private String status;

    @NotNull
    private Double total;

    private UserResponseDTO user;
}
