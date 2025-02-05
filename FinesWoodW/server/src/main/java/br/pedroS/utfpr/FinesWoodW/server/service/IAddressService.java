package br.pedroS.utfpr.FinesWoodW.server.service;

import java.util.List;

import br.pedroS.utfpr.FinesWoodW.server.dto.AddressCepDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Address;

public interface IAddressService extends
        ICrudService<Address, Long> {

        List<Address> findByUserId(Long userId);

        AddressCepDTO getCepData(String cep);
}
