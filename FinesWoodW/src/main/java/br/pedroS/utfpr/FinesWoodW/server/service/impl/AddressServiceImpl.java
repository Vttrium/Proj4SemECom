package br.pedroS.utfpr.FinesWoodW.server.service.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import br.pedroS.utfpr.FinesWoodW.server.dto.AddressCepDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Address;
import br.pedroS.utfpr.FinesWoodW.server.repository.AddressRepository;
import br.pedroS.utfpr.FinesWoodW.server.service.IAddressService;

@Service
public class AddressServiceImpl extends CrudServiceImpl<Address, Long>
        implements IAddressService {

    private final AddressRepository addressRepository;
    private final RestTemplate restTemplate;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
        this.restTemplate = new RestTemplate();
    }

    @Override
    protected JpaRepository<Address, Long> getRepository() {
        return addressRepository;
    }

    @Override
    public List<Address> findByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }

    public AddressCepDTO getCepData(String cep) {
        AddressCepDTO addressCepDTO = new AddressCepDTO();
    
        try {
          String apiUrl = "https://viacep.com.br/ws/" + cep + "/json/";
          addressCepDTO = restTemplate.getForObject(apiUrl, AddressCepDTO.class);
        } catch (Exception e) {
          throw new IllegalArgumentException("Formato de CEP inválido");
        }
    
        if (addressCepDTO == null || addressCepDTO.getCep() == null) {
          throw new IllegalArgumentException("CEP inválido");
        }
    
        return addressCepDTO;
    } 
}