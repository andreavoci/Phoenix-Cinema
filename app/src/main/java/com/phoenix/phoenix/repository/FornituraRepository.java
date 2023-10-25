package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Fornitura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FornituraRepository extends JpaRepository<Fornitura,Long> {
}
