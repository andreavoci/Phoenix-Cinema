package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findAll();
    Optional<Candidature> findById(Long id);
    @Query("SELECT c FROM Candidature c WHERE c.email = ?1")
    Optional<Candidature> findCandidatureByEmail(String email);
}
