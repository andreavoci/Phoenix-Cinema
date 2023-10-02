package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Biglietto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BigliettoRepository extends JpaRepository<Biglietto,Long> {
}
