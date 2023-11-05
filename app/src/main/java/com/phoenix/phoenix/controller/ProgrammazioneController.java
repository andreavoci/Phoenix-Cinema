package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Programmazione;
import com.phoenix.phoenix.service.ProgrammazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/programmazioni")
public class ProgrammazioneController {
    private final ProgrammazioneService service;

    @Autowired
    public ProgrammazioneController(ProgrammazioneService service){this.service=service;}

    @GetMapping
    public List<Programmazione> getProgrammazioni(){return service.getAllValid();}

    @PostMapping(path = "/create")
    public ResponseEntity creaProgrammazione(@RequestBody Programmazione programmazione){return service.create(programmazione);}

    @PostMapping(path = "/delete")
    public ResponseEntity<String> rimuoviProgrammazioni(@RequestBody List<Long> programmazioni){return service.delete(programmazioni);}

    @GetMapping("/{id}")
    public List<Programmazione> getAllFromPellicola(@PathVariable("id") long pellicola){return service.getAllFromPellicola(pellicola);}

    @GetMapping("/{id}/acquisto")
    public Optional<Programmazione> getProgrammazioneSingola(@PathVariable("id") Long id){return service.getById(id);}
}
