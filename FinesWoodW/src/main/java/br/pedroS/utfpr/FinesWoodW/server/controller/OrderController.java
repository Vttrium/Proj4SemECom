package br.pedroS.utfpr.FinesWoodW.server.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.OrderDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Order;
import br.pedroS.utfpr.FinesWoodW.server.service.ICrudService;
import br.pedroS.utfpr.FinesWoodW.server.service.IOrderService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("orders")
public class OrderController extends CrudController<Order, OrderDTO, Long> {
    private final IOrderService orderService;
    private final ModelMapper modelMapper;

    public OrderController(IOrderService orderService, ModelMapper modelMapper) {
        super(Order.class, OrderDTO.class);
        this.orderService = orderService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Order, Long> getService() {
        return this.orderService;
    }
    
    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

    private OrderDTO convertToResponseDto(Order order) {
        return modelMapper.map(order, OrderDTO.class);
    }

    private Order convertToEntity(OrderDTO orderDTO) {
        return modelMapper.map(orderDTO, Order.class);
    }

    @PostMapping("escape")
    public ResponseEntity<OrderDTO> create(@RequestBody @Valid OrderDTO orderDTO) {
        Order order = orderService.save(convertToEntity(orderDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToResponseDto(order));
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<OrderDTO>> findAllByUserId(@PathVariable Long userId) {
        List<Order> orders = orderService.findByUserId(userId);
        List<OrderDTO> response = orders.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}
