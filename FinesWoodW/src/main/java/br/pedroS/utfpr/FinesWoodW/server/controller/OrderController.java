package br.pedroS.utfpr.FinesWoodW.server.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.OrderDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Order;
import br.pedroS.utfpr.FinesWoodW.server.service.ICrudService;
import br.pedroS.utfpr.FinesWoodW.server.service.IOrderService;

@RestController
@RequestMapping("orders")
public class OrderController extends CrudController<Order, OrderDTO, Long> {
    private static Order orderService;
    private static ModelMapper modelMapper;

    public OrderController(Order orderService, ModelMapper modelMapper) {
        super(Order.class, OrderDTO.class);
        OrderController.orderService = orderService;
        OrderController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Order, Long> getService() {
        return orderService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}

