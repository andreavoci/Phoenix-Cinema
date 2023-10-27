package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Candidature;
import com.phoenix.phoenix.repository.CandidatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CandidatureService {
    private final CandidatureRepository candidatureRepository;

    @Autowired
    public CandidatureService(CandidatureRepository candidatureRepository) {
        this.candidatureRepository = candidatureRepository;
    }

    public ResponseEntity<String> saveCandidature(String jobTitle, String name, String email, String phone) {
        Optional<Candidature> candidatura = candidatureRepository.findCandidatureByEmail(email);
        if(!candidatura.isPresent()){
            Candidature c = new Candidature(jobTitle,name,email,phone);
            candidatureRepository.save(c);
            return new ResponseEntity<String>("Candidatura salvata!", HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }

}
