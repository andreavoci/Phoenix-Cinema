package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Fornitore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FornitoreRepository extends JpaRepository<Fornitore,Long> {
}
