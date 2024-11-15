package br.pedroS.utfpr.FinesWoodW.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItems extends JpaRepository<OrderItems, Long> {

    List<OrderItems> findByOrderId(String order);

    List<OrderItems> findByProductId(String product);

}
