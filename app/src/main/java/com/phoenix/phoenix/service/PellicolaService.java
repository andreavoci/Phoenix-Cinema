package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Pellicola;
import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.repository.PellicolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PellicolaService {
    private PellicolaRepository repository;

    @Autowired
    public PellicolaService(PellicolaRepository repository){this.repository=repository;}

    public List<Pellicola> getAllMovies(){return repository.findAll();}

    public Pellicola getPellicola(Long id){return repository.findById(id).get();}

    public ResponseEntity create(Pellicola pellicola){ return ResponseEntity.ok(repository.save(pellicola));}

    public ResponseEntity delete(Long id){
        if(!repository.existsById(id)){
            return ResponseEntity.badRequest().body("no film with this id");
        }
        repository.deleteById(id);
        return ResponseEntity.ok("ok");
    }
}
