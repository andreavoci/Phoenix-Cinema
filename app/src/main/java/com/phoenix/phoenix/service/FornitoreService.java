package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.*;
import com.phoenix.phoenix.repository.FornitoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class FornitoreService {

    private FornitoreRepository repository;


    @Autowired
    public FornitoreService(FornitoreRepository repository) {
        this.repository = repository;
    }

    public ResponseEntity create(String ragione_sociale,TipoFornitore tipo,String indirizzo,String email,String telefono){
            Fornitore f = new Fornitore(ragione_sociale,tipo, indirizzo, telefono,email);
            return ResponseEntity.ok(repository.save(f));
        }
    public ResponseEntity update(long id,String ragione_sociale, TipoFornitore tipo, String indirizzo, String email, String telefono){
        Optional<Fornitore> fornitoreById = repository.findById(id);
        if(fornitoreById.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fornitore not found");
        }else{
            fornitoreById.get().setEmail(email);
            repository.save(fornitoreById.get());

            if(!ragione_sociale.equals(""))
                fornitoreById.get().setRagione_sociale(ragione_sociale);
            if(!tipo.equals(""))
                fornitoreById.get().setTipo(tipo);
            if(!indirizzo.equals(""))
                fornitoreById.get().setIndirizzo(indirizzo);
            if(!email.equals(""))
                fornitoreById.get().setEmail(email);
            if(!telefono.equals(""))
                fornitoreById.get().setTelefono(telefono);

            return ResponseEntity.ok(repository.save(fornitoreById.get()));
        }
    }

    public ResponseEntity delete(List<Long> fornitori) {
        fornitori.forEach(f -> {
            repository.deleteById(f);
        });
        return ResponseEntity.ok("Fornitori eliminati!");
    }

    public List<Fornitore> getAll(){return repository.findAll();}
}
