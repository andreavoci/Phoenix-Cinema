package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Carrello;
import com.phoenix.phoenix.entity.Ordine;
import com.phoenix.phoenix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdineRepository extends JpaRepository<Ordine,Long> {

    @Query("SELECT o FROM Ordine o WHERE o.cliente = ?1")
    List<Ordine> findOrdersByUserID(User cliente);
}
