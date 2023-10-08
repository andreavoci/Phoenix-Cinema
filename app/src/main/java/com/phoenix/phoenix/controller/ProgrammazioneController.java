package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Programmazione;
import com.phoenix.phoenix.service.ProgrammazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/programmazioni")
public class ProgrammazioneController {
    private final ProgrammazioneService service;

    @Autowired
    public ProgrammazioneController(ProgrammazioneService service){this.service=service;}

    @GetMapping
    public List<Programmazione> getAll(){return service.getAll();}

    @GetMapping("/{id}")
    public List<Programmazione> getAllFromPellicola(@PathVariable("id") long pellicola){return service.getAllFromPellicola(pellicola);}

}
