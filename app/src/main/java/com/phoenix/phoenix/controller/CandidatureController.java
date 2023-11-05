package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Candidature;
import com.phoenix.phoenix.entity.Mansione;
import com.phoenix.phoenix.service.CandidatureService;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidature")
public class CandidatureController {
    private final CandidatureService candidatureService;

    @Autowired
    public CandidatureController(CandidatureService candidatureService) {
        this.candidatureService = candidatureService;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> inviaCandidatura(@RequestBody CandidaturaBody body) {
        return candidatureService.saveCandidature(body.nome, body.cognome, body.email, body.jobTitle);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> rimuoviCandidatura(@RequestBody List<Long> candidature) {
        return candidatureService.delete(candidature);
    }

    @GetMapping
    public List<Candidature> getCandidature(){return candidatureService.getAll();}

    static class CandidaturaBody{
        public String nome;
        public String cognome;
        public String email;
        @Enumerated(EnumType.STRING)
        public Mansione jobTitle;
    }
}