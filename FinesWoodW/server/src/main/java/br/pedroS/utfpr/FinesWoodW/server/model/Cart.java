package br.pedroS.utfpr.FinesWoodW.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = true) // Pode ser nulo para usuários não autenticados
    private User user;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private int quantity;
}
