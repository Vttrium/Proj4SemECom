package br.pedroS.utfpr.FinesWoodW.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.pedroS.utfpr.FinesWoodW.server.model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(String user);

}
