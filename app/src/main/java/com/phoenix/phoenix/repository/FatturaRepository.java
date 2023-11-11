package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Fattura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FatturaRepository extends JpaRepository<Fattura,Long> {
}