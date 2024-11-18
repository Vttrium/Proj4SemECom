package br.pedroS.utfpr.FinesWoodW.server.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @NotNull
	private UserResponseDTO user;
}
