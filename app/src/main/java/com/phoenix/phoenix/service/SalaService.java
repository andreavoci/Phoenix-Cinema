package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Sala;
import com.phoenix.phoenix.repository.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalaService {
    private SalaRepository repository;

    @Autowired
    public SalaService(SalaRepository repository){ this.repository = repository; }

    public List<Sala> getAll() { return repository.findAll();}



    public ResponseEntity create(Sala sala) {
        return ResponseEntity.ok(repository.save(sala));
    }
}
