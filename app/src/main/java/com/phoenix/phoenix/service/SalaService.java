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

    public ResponseEntity delete(List<Long> sale){
        sale.forEach(s -> {
            repository.deleteById(s);
        });
        return ResponseEntity.ok("Sale eliminate!");
    }

    public ResponseEntity update(Sala sala) {
        Optional<Sala> salaByID = repository.findById(sala.getId());
        if(salaByID.isEmpty()){
            return ResponseEntity.badRequest().body("Sala inesistente!");
        }else{
            salaByID.get().setNome(sala.getNome());
            salaByID.get().setCapienza(sala.getCapienza());
            repository.save(salaByID.get());
            return ResponseEntity.ok("Sala modificata con successo!");
        }
    }
}
