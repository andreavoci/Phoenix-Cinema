package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.ElementoVendita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElementoVenditaRepository extends JpaRepository<ElementoVendita,Long>{
}
