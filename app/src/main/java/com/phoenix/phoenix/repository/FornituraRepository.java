package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Fornitura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FornituraRepository extends JpaRepository<Fornitura,Long> {

    @Query("SELECT f FROM Fornitura f WHERE f.id = ?1")
    Optional<Fornitura> findFornituraByID(Long id);

}