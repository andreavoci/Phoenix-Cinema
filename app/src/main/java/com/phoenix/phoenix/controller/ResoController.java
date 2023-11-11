package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Reso;
import com.phoenix.phoenix.service.ProgrammazioneService;
import com.phoenix.phoenix.service.ResoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/resi")
public class ResoController {
    private final ResoService service;

    @Autowired
    public ResoController(ResoService service){this.service=service;}

    @GetMapping
    public List<Reso> getResi(){return service.getAll();}

    @PostMapping(path = "/create")
    public ResponseEntity aggiungiReso(@RequestBody Reso reso){ return service.create(reso);}

    @PostMapping(path = "/update")
    public ResponseEntity modificaReso(@RequestBody Long id){ return service.modifica(id);}

    @PostMapping(path = "/delete")
    public ResponseEntity rimuoviReso(@RequestBody Long id){ return service.elimina(id);}
}
