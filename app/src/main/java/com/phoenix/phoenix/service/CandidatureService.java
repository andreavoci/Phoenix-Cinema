package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Candidature;
import com.phoenix.phoenix.entity.Mansione;
import com.phoenix.phoenix.repository.CandidatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatureService {
    private final CandidatureRepository candidatureRepository;

    @Autowired
    public CandidatureService(CandidatureRepository candidatureRepository) {
        this.candidatureRepository = candidatureRepository;
    }

    public ResponseEntity<String> saveCandidature(String nome, String cognome, String email, Mansione jobTitle) {
        Optional<Candidature> candidatura = candidatureRepository.findCandidatureByEmail(email);
        if(!candidatura.isPresent()){
            Candidature c = new Candidature(cognome,nome,email);
            c.setJobTitle(jobTitle);
            candidatureRepository.save(c);
            return new ResponseEntity<String>("Candidatura salvata!", HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }

    public List<Candidature> getAll() {
        return candidatureRepository.findAll();
    }

    public ResponseEntity<String> delete(List<Long> candidature) {
        candidature.forEach(c -> {
            candidatureRepository.deleteById(c);
        });
        return ResponseEntity.ok("Candidature eliminate!");
    }
}
