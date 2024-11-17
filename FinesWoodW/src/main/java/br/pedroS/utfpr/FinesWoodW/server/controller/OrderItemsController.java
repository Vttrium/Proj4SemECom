package br.pedroS.utfpr.FinesWoodW.server.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.OrderItemsDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.OrderItems;
import br.pedroS.utfpr.FinesWoodW.server.service.ICrudService;

@RestController
@RequestMapping("orderItems")
public class OrderItemsController extends CrudController<OrderItems, OrderItemsDTO, Long> {
    private static OrderItems orderItemsService;
    private static ModelMapper modelMapper;

    public OrderItemsController(OrderItems orderItemsService, ModelMapper modelMapper) {
        super(OrderItems.class, OrderItemsDTO.class);
        OrderItemsController.orderItemsService = orderItemsService;
        OrderItemsController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<OrderItems, Long> getService() {
        return orderItemsService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
