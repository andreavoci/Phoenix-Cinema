package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Pellicola;
import com.phoenix.phoenix.repository.PellicolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PellicolaService {
    private PellicolaRepository repository;
    @Autowired
    private FornituraService fornituraService;

    @Autowired
    public PellicolaService(PellicolaRepository repository){this.repository=repository;    }

    public List<Pellicola> getAllMovies(){return repository.findAll();}

    public Pellicola getPellicola(Long id){return repository.findById(id).get();}

    public ResponseEntity create(Pellicola pellicola){ return ResponseEntity.ok(repository.save(pellicola));}

    public ResponseEntity delete(List<Long> pellicole){
        pellicole.forEach(p -> {
            repository.deleteById(p);
        });
        return ResponseEntity.ok("Pellicole eliminate!");
    }

    public ResponseEntity update(Long pellicolaID, String titolo, Date dataUscita, int durata, String generi, int pegi, String trama, String regista, String attori, String trailer, String locandina, long fornituraID) {
        Optional<Pellicola> pellicola = repository.findById(pellicolaID);
        if(pellicola.isPresent()){
            pellicola.get().setTitolo(titolo);
            pellicola.get().setData_uscita(dataUscita);
            pellicola.get().setDurata(durata);
            pellicola.get().setGeneri(generi);
            pellicola.get().setTrama(trama);
            pellicola.get().setPegi(pegi);
            pellicola.get().setRegista(regista);
            pellicola.get().setAttori(attori);
            pellicola.get().setLocandina(locandina);
            pellicola.get().setTrailer(trailer);
            repository.save(pellicola.get());
            return ResponseEntity.ok("Pellicola modificata!");
        }
        return ResponseEntity.badRequest().body("Pellicola inesistente!");
    }
}
