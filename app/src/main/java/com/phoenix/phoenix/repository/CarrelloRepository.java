package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Carrello;
import com.phoenix.phoenix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarrelloRepository extends JpaRepository<Carrello,Long> {

    @Query("SELECT c FROM Carrello c WHERE c.cliente = ?1")
    Optional<Carrello> findCartByUserID(User cliente);
}
