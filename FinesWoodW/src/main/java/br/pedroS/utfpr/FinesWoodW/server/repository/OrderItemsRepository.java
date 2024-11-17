package br.pedroS.utfpr.FinesWoodW.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemsRepository extends JpaRepository<OrderItemsRepository, Long> {

    List<OrderItemsRepository> findByOrderId(String order);

    List<OrderItemsRepository> findByProductId(String product);

}
