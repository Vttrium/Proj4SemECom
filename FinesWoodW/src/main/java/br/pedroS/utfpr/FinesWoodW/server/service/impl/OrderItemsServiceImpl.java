package br.pedroS.utfpr.FinesWoodW.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.pedroS.utfpr.FinesWoodW.server.dto.OrderItemsDTO;
import br.pedroS.utfpr.FinesWoodW.server.repository.OrderItemsRepository;
import br.pedroS.utfpr.FinesWoodW.server.service.IOrderItemsService;

@Service
public class OrderItemsServiceImpl extends CrudServiceImpl<OrderItemsDTO, Long>
        implements IOrderItemsService {

    private final OrderItemsRepository orderItemsRepository;

    public OrderItemsServiceImpl(OrderItemsRepository orderItemsRepository) {
        this.orderItemsRepository = orderItemsRepository;
    }

    @Override
    protected JpaRepository<OrderItemsDTO, Long> getRepository() {
        return orderItemsRepository;
    }
}
