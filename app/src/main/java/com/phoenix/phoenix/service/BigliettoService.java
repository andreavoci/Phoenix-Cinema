package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Biglietto;
import com.phoenix.phoenix.repository.BigliettoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BigliettoService {

    private BigliettoRepository repository;

    @Autowired
    public BigliettoService(BigliettoRepository repository){
        this.repository = repository;
    }


    public List<Biglietto> getAllTickets(){
        return repository.findAll();
    }

    //2xx ok
    //4xx errori fatti dall'utente
    //5xx errori del server

    public ResponseEntity create(Biglietto biglietto){
        return ResponseEntity.ok(repository.save(biglietto));
    }

    public ResponseEntity delete(Long id){
        if(!repository.existsById(id)){
            return ResponseEntity.badRequest().body("no ticket with this id");
        }
        repository.deleteById(id);
        return ResponseEntity.ok("ok");
    }
}
