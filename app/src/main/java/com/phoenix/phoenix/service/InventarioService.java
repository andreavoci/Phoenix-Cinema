package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Fornitura;
import com.phoenix.phoenix.entity.Inventario;
import com.phoenix.phoenix.repository.InventarioRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    public List<Inventario> getAll() {return repository.findAll();}

    public ResponseEntity updateQuantita(List<Integer> nuovoInv){
        Optional<Inventario> inventario_opt = repository.findById(Long.valueOf(nuovoInv.get(0)));
        if(inventario_opt.isPresent()){
            if(inventario_opt.get().getQuantitaInStock() < nuovoInv.get(1)){
                return ResponseEntity.badRequest().body("quantità in stock non sufficiente");
            }
            else{
                inventario_opt.get().setQuantitaEsposta(nuovoInv.get(1));
                inventario_opt.get().setQuantitaInStock(inventario_opt.get().getQuantitaTot() - nuovoInv.get(1));
                return ResponseEntity.ok(repository.save(inventario_opt.get()));
            }
        }
        return ResponseEntity.badRequest().body("nessun inventario con questo id");
    }
}

