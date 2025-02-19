package br.pedroS.utfpr.FinesWoodW.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "tb_order")
@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime data;

    @NotNull
    private String payMethod;

    @NotNull
    private String status;

    @NotNull
    private Double total;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "shipAddressId", nullable = false)
    private Address shipAddress;
  
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItems> orderItems;
  
    @CreationTimestamp
    private LocalDateTime createdAt;
}
