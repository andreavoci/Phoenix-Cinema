package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Candidature;
import com.phoenix.phoenix.service.CandidatureService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/candidature")
public class CandidatureController {
    private final CandidatureService candidatureService;

    @Autowired
    public CandidatureController(CandidatureService candidatureService) {
        this.candidatureService = candidatureService;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitCandidature(@Valid @RequestBody Candidature candidature, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Errore di validazione: " + result.getAllErrors());
        }
        Candidature savedCandidature = candidatureService.saveCandidature(candidature);
        return ResponseEntity.ok("Candidatura salvata con successo");
    }
}