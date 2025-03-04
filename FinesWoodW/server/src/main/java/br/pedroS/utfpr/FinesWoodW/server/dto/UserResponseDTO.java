package br.pedroS.utfpr.FinesWoodW.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import br.pedroS.utfpr.FinesWoodW.server.model.User;
import br.pedroS.utfpr.FinesWoodW.server.security.dto.AuthorityResponseDTO;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {

    private Long id;
    private String email;
    private String username;
    private Set<AuthorityResponseDTO> authorities;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.authorities = new HashSet<>();
        for (GrantedAuthority authority: user.getAuthorities()) {
            authorities.add( new AuthorityResponseDTO(authority.getAuthority()) );
        }
    }

}
