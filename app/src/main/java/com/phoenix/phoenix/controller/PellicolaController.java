package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Pellicola;
import com.phoenix.phoenix.service.PellicolaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/pellicole")
public class PellicolaController {
    private final PellicolaService service;

    @Autowired
    public PellicolaController(PellicolaService service){ this.service=service;}

    @GetMapping(path = "/all")
    public List<Pellicola> getAllMovies(){return service.getAllMovies();}

    @PostMapping(path = "/create")
    public ResponseEntity create(@RequestBody Pellicola pellicola){return service.create(pellicola);}

    @DeleteMapping(path = "/delete/{pellicola}")
    public ResponseEntity delete(@RequestBody Long id){return service.delete(id);}
}
