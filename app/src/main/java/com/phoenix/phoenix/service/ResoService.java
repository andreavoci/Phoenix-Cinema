package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.*;
import com.phoenix.phoenix.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ResoService {
    private ResoRepository repository;
    @Autowired
    private OrdineRepository ordineRepository;
    @Autowired
    private BigliettoRepository bigliettoRepository;
    @Autowired
    private ProgrammazioneRepository programmazioneRepository;

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
            List<Biglietto> bigliettiOrdine = bigliettoRepository.findBigliettoByOrdine(ordine);
            Programmazione programmazione;
//            Optional<Programmazione> programmazione = programmazioneRepository.findById(bigliettiOrdine.get(0).getProgrammazione().getId());
//            Collection<Posto> posti = programmazione.get().getPosti();
            for(Biglietto b : bigliettiOrdine){
                b.setOrdine(null);
                long postoID = b.getPosto();
                programmazione = b.getProgrammazione();
                Collection<Posto> posti = programmazione.getPosti();
                for (Posto p : posti){
                    if(p.getId()==postoID){
                        p.setStato("LIBERO");
                    }
                }
                programmazioneRepository.aggiornaPosti(posti,programmazione.getId());
                bigliettoRepository.delete(b);
            }
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
