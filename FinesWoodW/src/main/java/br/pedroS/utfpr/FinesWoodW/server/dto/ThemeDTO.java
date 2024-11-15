package br.pedroS.utfpr.FinesWoodW.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ThemeDTO {
    
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;

    @NotNull
    private float percentageRise;
}
