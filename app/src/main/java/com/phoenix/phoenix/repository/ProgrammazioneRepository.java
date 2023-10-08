package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Programmazione;
import com.phoenix.phoenix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProgrammazioneRepository extends JpaRepository<Programmazione,Long> {
    @Query("SELECT p FROM Programmazione p WHERE p.pellicola.id = ?1")
    List<Programmazione> findProgrammazioneByPellicolaId(long pellicola);

}
