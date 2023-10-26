package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Candidature;
import com.phoenix.phoenix.repository.CandidatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CandidatureService {
    private final CandidatureRepository candidatureRepository;

    @Autowired
    public CandidatureService(CandidatureRepository candidatureRepository) {
        this.candidatureRepository = candidatureRepository;
    }

    public Candidature saveCandidature(Candidature candidature) {
        return candidatureRepository.save(candidature);
    }

}
