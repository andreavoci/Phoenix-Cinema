package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findAll();
    Optional<Candidature> findById(Long id);
}
