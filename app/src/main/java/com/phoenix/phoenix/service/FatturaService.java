package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Fattura;
import com.phoenix.phoenix.entity.Vendita;
import com.phoenix.phoenix.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FatturaService {
    private FatturaRepository repository;
    @Autowired
    public FatturaService(FatturaRepository repository){ this.repository = repository;}

    public List<Fattura> getAll() {return repository.findAll();}

    public ResponseEntity paga(Long id) {
        Optional<Fattura> fatturaDB = repository.findById(id);
        if(fatturaDB.isPresent()){
            fatturaDB.get().setPagamento(new Date());
            return ResponseEntity.ok(repository.save(fatturaDB.get()));
        }else{
            return ResponseEntity.badRequest().body("Fattura inesistente!");
        }
    }
}
