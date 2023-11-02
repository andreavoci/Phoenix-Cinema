package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Fornitura;
import com.phoenix.phoenix.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository repository;



    public ResponseEntity deletemerce(List<Long> merce) {
        merce.forEach(m -> {
            repository.deleteById(m);
        });
        return ResponseEntity.ok("Cancellata correttamente");
    }
}

