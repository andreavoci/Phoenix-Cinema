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
    public ResponseEntity<String> submitCandidature(@RequestBody CandidaturaBody body) {
        return candidatureService.saveCandidature(body.jobTitle, body.name, body.surname, body.email, body.phone);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCandidature(@RequestBody List<Long> candidature) {
        return candidatureService.delete(candidature);
    }

    @GetMapping
    public List<Candidature> getAll(){return candidatureService.getAll();}

    static class CandidaturaBody{
        @Enumerated(EnumType.STRING)
        public Mansione jobTitle;
        public String surname;
        public String name;
        public String email;
        public String phone;
    }
}