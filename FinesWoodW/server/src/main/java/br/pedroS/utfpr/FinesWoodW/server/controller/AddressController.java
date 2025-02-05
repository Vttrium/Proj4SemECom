package br.pedroS.utfpr.FinesWoodW.server.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.AddressCepDTO;
import br.pedroS.utfpr.FinesWoodW.server.dto.AddressDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Address;
import br.pedroS.utfpr.FinesWoodW.server.service.IAddressService;
import br.pedroS.utfpr.FinesWoodW.server.service.ICrudService;

@RestController
@RequestMapping("address")
public class AddressController extends CrudController<Address, AddressDTO, Long>{
    private final IAddressService addressService;
    private final ModelMapper modelMapper;

    public AddressController(IAddressService addressService, ModelMapper modelMapper) {
        super(Address.class, AddressDTO.class);
        this.addressService = addressService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Address, Long> getService() {
        return this.addressService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

    private AddressDTO convertToResponseDto(Address address) {
        return modelMapper.map(address, AddressDTO.class);
    }

    private AddressDTO convertToResponseCepDto(AddressCepDTO addressCepDTO) {
        modelMapper.typeMap(AddressCepDTO.class, AddressDTO.class)
            .addMappings(mapper -> {
              mapper.map(AddressCepDTO::getLocalidade, AddressDTO::setCity);
              mapper.map(AddressCepDTO::getLogradouro, AddressDTO::setLogradouro);
              mapper.map(AddressCepDTO::getUf, AddressDTO::setState);
              mapper.map(AddressCepDTO::getCep, AddressDTO::setCep);
              mapper.map(AddressCepDTO::getComplemento, AddressDTO::setComplement);
            });
    
        return modelMapper.map(addressCepDTO, AddressDTO.class);
    } 

    @GetMapping("user/{userId}")
    public ResponseEntity<List<AddressDTO>> findAllByUserId(@PathVariable Long userId) {
        List<AddressDTO> addresses = addressService.findByUserId(userId).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("validate/{cep}")
    public ResponseEntity<AddressDTO> validateAndFetchCep(@PathVariable String cep) {
      AddressCepDTO addressCepDTO = addressService.getCepData(cep);
  
      return ResponseEntity.ok(convertToResponseCepDto(addressCepDTO));
    } 
}
