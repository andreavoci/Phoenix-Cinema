package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Candidature;
import com.phoenix.phoenix.service.CandidatureService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
    public ResponseEntity<String> submitCandidature(@RequestBody CandidaturaBody body) {
        return candidatureService.saveCandidature(body.jobTitle, body.name, body.email, body.phone);
    }

    static class CandidaturaBody{
        public String jobTitle;
        public String name;
        public String email;
        public String phone;
    }
}