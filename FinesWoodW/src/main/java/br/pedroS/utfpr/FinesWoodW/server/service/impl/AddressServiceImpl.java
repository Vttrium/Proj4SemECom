package br.pedroS.utfpr.FinesWoodW.server.service.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.pedroS.utfpr.FinesWoodW.server.model.Address;
import br.pedroS.utfpr.FinesWoodW.server.repository.AddressRepository;
import br.pedroS.utfpr.FinesWoodW.server.service.IAddressService;

@Service
public class AddressServiceImpl extends CrudServiceImpl<Address, Long>
        implements IAddressService {

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    protected JpaRepository<Address, Long> getRepository() {
        return addressRepository;
    }

    @Override
    public List<Address> findByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }
}