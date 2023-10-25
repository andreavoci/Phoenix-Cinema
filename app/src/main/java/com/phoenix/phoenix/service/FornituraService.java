package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Fornitura;
import com.phoenix.phoenix.repository.FornituraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornituraService {

    private FornituraRepository repository;


    @Autowired
    public FornituraService(FornituraRepository repository) {
        this.repository = repository;
    }


    public List<Fornitura> getAll(){return repository.findAll();}
}
