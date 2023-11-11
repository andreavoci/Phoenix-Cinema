package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Biglietto;
import com.phoenix.phoenix.entity.Ordine;
import com.phoenix.phoenix.entity.Reso;
import com.phoenix.phoenix.repository.OrdineRepository;
import com.phoenix.phoenix.repository.ResoRepository;
import com.phoenix.phoenix.repository.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResoService {
    private ResoRepository repository;
    private OrdineRepository ordineRepository;

    @Autowired
    public ResoService(ResoRepository repository){ this.repository = repository; }

    public List<Reso> getAll(){
        return repository.findAll();
    }

    public ResponseEntity create(Reso reso){ return ResponseEntity.ok(repository.save(reso));}

    public ResponseEntity modifica(Long id){
        Optional<Reso> resoById = repository.findById(id);
        if(resoById.isEmpty()){
            return ResponseEntity.badRequest().body("Reso inesistente!");
        }else {
            Reso r = resoById.get();
            r.setStato("ACCETTATO");
            Ordine ordine = r.getOrdine();
            List<Biglietto> biglietti = ordine.getBiglietti();
            return ResponseEntity.ok(repository.save(r));
        }
    }

    public ResponseEntity elimina(Long id){
        Optional<Reso> resoById = repository.findById(id);
        if(resoById.isEmpty()){
            return ResponseEntity.badRequest().body("Reso inesistente!");
        }else {
            Reso r = resoById.get();
            repository.delete(r);
            return ResponseEntity.ok("Reso rifiutato!");
        }
    }
}
