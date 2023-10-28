package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Dipendente;
import com.phoenix.phoenix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DipendenteRepository extends JpaRepository<Dipendente,Long> {
    @Query("SELECT d FROM Dipendente d WHERE d.userID = ?1")
    Optional<Dipendente> findDipendentiByUser(User user);
}
