package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.*;
import com.phoenix.phoenix.repository.FornituraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.*;

@Service
public class FornituraService {

    private FornituraRepository repository;


    @Autowired
    public FornituraService(FornituraRepository repository) {
        this.repository = repository;
    }


    public List<Fornitura> getAll(){return repository.findAll();}

    public ResponseEntity create(Fornitura fornitura){
        fornitura.getMerci().forEach(m->{
            m.setFornitura(fornitura);
        });
        fornitura.setStato("ORDINATA");
        repository.save(fornitura);

        return ResponseEntity.ok("Fornitura creata correttamente");
    }
    public ResponseEntity deleteFornitura(List<Long> forniture) {
        forniture.forEach(f -> {
            repository.deleteById(f);
        });
        return ResponseEntity.ok("deleted correctly");
    }
}
