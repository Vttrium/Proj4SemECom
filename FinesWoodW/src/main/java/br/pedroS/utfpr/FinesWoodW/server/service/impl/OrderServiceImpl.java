package br.pedroS.utfpr.FinesWoodW.server.service.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.pedroS.utfpr.FinesWoodW.server.model.Order;
import br.pedroS.utfpr.FinesWoodW.server.model.Product;
import br.pedroS.utfpr.FinesWoodW.server.repository.OrderRepository;
import br.pedroS.utfpr.FinesWoodW.server.service.IOrderService;

@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Long>
        implements IOrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    protected JpaRepository<Order, Long> getRepository() {
        return orderRepository;
    }

    public List<Order> findByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order save(Order order) {
        order.getOrderItems().forEach(item -> {
            item.setOrder(order);
            Product product = productRepository.findBy
            item.setPrice(product.getPrice());
        });
    }
}