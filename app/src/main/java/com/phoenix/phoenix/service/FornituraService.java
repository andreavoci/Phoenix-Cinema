package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.*;
import com.phoenix.phoenix.repository.FornituraRepository;
import com.phoenix.phoenix.repository.InventarioRepository;
import com.phoenix.phoenix.repository.ProgrammazioneRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.*;

@Service
public class FornituraService {

    @Autowired
    private FornituraRepository repository;
    @Autowired
    private InventarioRepository inventarioRepository;


    @Autowired
    public FornituraService(FornituraRepository repository) {
        this.repository = repository;
    }


    public List<Fornitura> getAll(){return repository.findAll();}

    public ResponseEntity create(Fornitura fornitura){
        fornitura.getMerci().forEach(m->{
            m.setFornitura(fornitura);
        });
        fornitura.setStato("ORDINATA");
        repository.save(fornitura);

        return ResponseEntity.ok("Fornitura creata correttamente");
    }
    public ResponseEntity deleteFornitura(List<Long> forniture) {
        forniture.forEach(f -> {
            repository.deleteById(f);
        });
        return ResponseEntity.ok("Cancellata correttamente");
    }
    public ResponseEntity aggiungiDataArrivo(Fornitura f) {
        Optional<Fornitura> fornitura = repository.findFornituraByID(f.getId());
        if (fornitura.isPresent()) {
            fornitura.get().setArrivo(new Date());
            fornitura.get().setStato("ARRIVATA");
            repository.save(fornitura.get());
            return aggiungiInventario(f.getMerci());
        }
        else
            return ResponseEntity.badRequest().body("Fornitura non trovata");

    }private ResponseEntity aggiungiInventario(List<Merce> merci){
        List<Inventario> inventario = inventarioRepository.findAll();
        List<Inventario> nuovoInventario = new ArrayList<>();
        Boolean trovato;
        for(Merce merce: merci){
            trovato = false;
            for(Inventario i: inventario){
                if(merce.getNome().equals(i.getNome())) {
                    i.setQuantitaInStock(merce.getQuantita() + i.getQuantitaInStock());
                    trovato = true;
                }

            }if (!trovato) {
                Inventario nuovoInventarioMerce = new Inventario(merce.getNome(),merce.getTipo(),merce.getPrezzo(),merce.getQuantita(),0);
                nuovoInventario.add(nuovoInventarioMerce);

            }

        }nuovoInventario.addAll(inventario);
        inventarioRepository.saveAll(nuovoInventario);
        return ResponseEntity.ok("Merce aggiunta correttamente");
    }

}
