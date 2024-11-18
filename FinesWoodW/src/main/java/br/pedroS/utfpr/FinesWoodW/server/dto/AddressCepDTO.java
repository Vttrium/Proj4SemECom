package br.pedroS.utfpr.FinesWoodW.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressCepDTO {
    private String cep;
    private String bairro;
    private String complemento;
    private String logradouro;
    private String localidade;
    private String estado;
    private String regiao;
    private String uf;
}
