package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.*;
import com.phoenix.phoenix.repository.FornitoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class FornitoreService {

    private FornitoreRepository repository;


    @Autowired
    public FornitoreService(FornitoreRepository repository) {
        this.repository = repository;
    }

    public ResponseEntity create(String ragione_sociale,TipoFornitore tipo,String indirizzo,String email,String telefono){
            Fornitore f = new Fornitore(ragione_sociale,tipo, indirizzo, telefono,email);
            return ResponseEntity.ok(repository.save(f));
        }


    public ResponseEntity delete(List<Long> fornitori) {
        fornitori.forEach(f -> {
            repository.deleteById(f);
        });
        return ResponseEntity.ok("Fornitori eliminati!");
    }

    public List<Fornitore> getAll(){return repository.findAll();}
}
