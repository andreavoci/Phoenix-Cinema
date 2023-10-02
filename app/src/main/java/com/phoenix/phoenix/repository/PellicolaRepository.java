package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Pellicola;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PellicolaRepository extends JpaRepository<Pellicola,Long> {
}
