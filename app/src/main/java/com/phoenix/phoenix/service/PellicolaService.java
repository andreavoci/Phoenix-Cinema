package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Pellicola;
import com.phoenix.phoenix.repository.PellicolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PellicolaService {
    private PellicolaRepository pellicolaRepository;

    @Autowired
    public PellicolaService(PellicolaRepository repository){this.pellicolaRepository=repository;}

    public List<Pellicola> getAllMovies(){return pellicolaRepository.findAll();}

    public ResponseEntity create(Pellicola pellicola){ return ResponseEntity.ok(pellicolaRepository.save(pellicola));}

    public ResponseEntity delete(Long id){
        if(!pellicolaRepository.existsById(id)){
            return ResponseEntity.badRequest().body("no ticket with this id");
        }
        pellicolaRepository.deleteById(id);
        return ResponseEntity.ok("ok");
    }
}
