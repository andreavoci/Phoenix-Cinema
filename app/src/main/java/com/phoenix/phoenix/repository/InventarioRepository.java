package com.phoenix.phoenix.repository;


import com.phoenix.phoenix.entity.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository  extends JpaRepository<Inventario,Long> {
}
