package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Fornitore;
import com.phoenix.phoenix.repository.FornitoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornitoreService {

    private FornitoreRepository repository;


    @Autowired
    public FornitoreService(FornitoreRepository repository) {
        this.repository = repository;
    }


    public List<Fornitore> getAll(){return repository.findAll();}
}
