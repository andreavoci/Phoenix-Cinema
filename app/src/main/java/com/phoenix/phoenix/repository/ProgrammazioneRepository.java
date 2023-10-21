package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Posto;
import com.phoenix.phoenix.entity.Programmazione;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ProgrammazioneRepository extends JpaRepository<Programmazione,Long> {
    @Query("SELECT p FROM Programmazione p WHERE p.pellicola.id = ?1")
    List<Programmazione> findProgrammazioneByPellicolaId(long pellicola);
    Optional<Programmazione> findById(Long id);


    @Modifying
    @Transactional
    @Query(value = "UPDATE Programmazione p SET p.posti = :posti WHERE p.id = :programmazioneId")
    void aggiornaPosti(Collection<Posto> posti, Long programmazioneId);
}
