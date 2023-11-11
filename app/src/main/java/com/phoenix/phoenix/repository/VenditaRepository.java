package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Vendita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VenditaRepository extends JpaRepository<Vendita, Long> {
    //@Query("SELECT v FROM Vendita v WHERE v.merci")
}
