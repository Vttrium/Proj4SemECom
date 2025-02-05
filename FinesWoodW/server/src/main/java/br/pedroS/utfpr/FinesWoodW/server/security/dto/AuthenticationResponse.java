package br.pedroS.utfpr.FinesWoodW.server.security.dto;

import br.pedroS.utfpr.FinesWoodW.server.dto.UserResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {

    private String token;
    private UserResponseDTO user;

}
