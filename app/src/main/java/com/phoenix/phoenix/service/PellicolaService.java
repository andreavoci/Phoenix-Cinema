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
    public ResponseEntity update(Pellicola editedPellicola){
        Optional<Pellicola> pellicolaOpt = repository.findById(editedPellicola.getId());
        System.out.println(editedPellicola);
        if(pellicolaOpt.isPresent()){
            if(editedPellicola.getTitolo()!=null) pellicolaOpt.get().setTitolo(editedPellicola.getTitolo());
            if(editedPellicola.getFornitura()!=null) pellicolaOpt.get().setFornitura(editedPellicola.getFornitura());
            if(editedPellicola.getData_uscita()!=null) pellicolaOpt.get().setData_uscita(editedPellicola.getData_uscita());
            if(editedPellicola.getDurata()!=0) pellicolaOpt.get().setDurata(editedPellicola.getDurata());
            if(editedPellicola.getGeneri()!=null) pellicolaOpt.get().setGeneri(editedPellicola.getGeneri());
            if(editedPellicola.getTrama()!=null) pellicolaOpt.get().setTrama(editedPellicola.getTrama());
            if(editedPellicola.getPegi()!=0) pellicolaOpt.get().setPegi(editedPellicola.getPegi());
            if(editedPellicola.getRegista()!=null) pellicolaOpt.get().setRegista(editedPellicola.getRegista());
            if(editedPellicola.getAttori()!=null) pellicolaOpt.get().setAttori(editedPellicola.getAttori());
            if(editedPellicola.getPrezzo_noleggio()!=0) pellicolaOpt.get().setPrezzo_noleggio(editedPellicola.getPrezzo_noleggio());
            if(editedPellicola.getLocandina()!=null) pellicolaOpt.get().setLocandina(editedPellicola.getLocandina());
            if(editedPellicola.getTrailer()!=null) pellicolaOpt.get().setTrailer(editedPellicola.getTrailer());
            if(editedPellicola.getFine_noleggio()!=null) pellicolaOpt.get().setFine_noleggio(editedPellicola.getFine_noleggio());
//            System.out.println(pellicolaOpt.get().getDurata());
//
            repository.save(pellicolaOpt.get());
            return ResponseEntity.ok("Pellicola modificata!");
        }
        return ResponseEntity.badRequest().body("Pellicola inesistente!");
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
