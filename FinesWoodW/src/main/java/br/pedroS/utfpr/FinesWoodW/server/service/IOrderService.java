package br.pedroS.utfpr.FinesWoodW.server.service;
 
import java.util.List;

import br.pedroS.utfpr.FinesWoodW.server.model.Order;

public interface IOrderService extends
        ICrudService<Order, Long>{

        List<Order> findByUserId(Long userId);

}
