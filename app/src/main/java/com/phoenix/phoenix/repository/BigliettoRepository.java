package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Biglietto;
import com.phoenix.phoenix.entity.Ordine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BigliettoRepository extends JpaRepository<Biglietto,Long> {
    @Query("SELECT b FROM Biglietto b WHERE b.ordine = ?1")
    List<Biglietto> findBigliettoByOrdine(Ordine ordine);
}
