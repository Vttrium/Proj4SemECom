package br.pedroS.utfpr.FinesWoodW.server.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;

    @NotNull
    private String payMethod;

    @NotNull
    private String status;

    @NotNull
    private Double total;

    @NotNull
	private UserResponseDTO user;

    @NotNull
    private Long shipAddress;

    private List<OrderDTO> orderItems;
}
