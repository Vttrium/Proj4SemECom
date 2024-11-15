package br.pedroS.utfpr.FinesWoodW.server.dto;

import jakarta.validation.constraints.NotNull;

public class AddressDTO {
    private Long id;

    @NotNull
    private String cep;

    @NotNull
    private String state;

    @NotNull
    private String city;

    private String complement;

    @NotNull
    private String logradouro;

    private UserResponseDTO user;
}
