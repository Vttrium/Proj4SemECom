package br.pedroS.utfpr.FinesWoodW.server.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.AddressDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Address;
import br.pedroS.utfpr.FinesWoodW.server.service.IAddressService;
import br.pedroS.utfpr.FinesWoodW.server.service.ICrudService;

@RestController
@RequestMapping("address")
public class AddressController extends CrudController<Address, AddressDTO, Long> {
    private static IAddressService addressService;
    private static ModelMapper modelMapper;

    public AddressController(IAddressService addressService, ModelMapper modelMapper) {
        super(Address.class, AddressDTO.class);
        AddressController.addressService = addressService;
        AddressController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Address, Long> getService() {
        return addressService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
