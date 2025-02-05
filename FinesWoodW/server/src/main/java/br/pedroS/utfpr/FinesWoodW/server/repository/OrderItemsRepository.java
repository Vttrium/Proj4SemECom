package br.pedroS.utfpr.FinesWoodW.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pedroS.utfpr.FinesWoodW.server.model.OrderItems;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {

}
