package br.pedroS.utfpr.FinesWoodW.server.service.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.pedroS.utfpr.FinesWoodW.server.model.Order;
import br.pedroS.utfpr.FinesWoodW.server.model.Product;
import br.pedroS.utfpr.FinesWoodW.server.repository.OrderRepository;
import br.pedroS.utfpr.FinesWoodW.server.repository.ProductRepository;
import br.pedroS.utfpr.FinesWoodW.server.service.IOrderService;

@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Long>
        implements IOrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
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
            Product product = productRepository.findById(item.getProduct().getId()).orElse(null);
            item.setPrice(product.getPrice());
        });

        return orderRepository.save(order);
    }
}