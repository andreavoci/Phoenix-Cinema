package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Posto;
import com.phoenix.phoenix.entity.Programmazione;
import com.phoenix.phoenix.repository.ProgrammazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ProgrammazioneService {
    private ProgrammazioneRepository repository;

    @Autowired
    public ProgrammazioneService(ProgrammazioneRepository repository){this.repository=repository;}

    public Optional<Programmazione> getById(long id){return repository.findById(id);}

    public List<Programmazione> getAll(){return repository.findAll();}

    public List<Programmazione> getAllValid(){return repository.findProgrammazioneFromDate(LocalDateTime.now());}

    public List<Programmazione> getAllFromPellicola(long pellicola){return repository.findProgrammazioneByPellicolaId(pellicola);}

    public ResponseEntity create(Programmazione programmazione){
        Collection<Posto> posti = new ArrayList<>();
        int codice = 65;
        int indice = 1;
        char lettera = (char)codice;

        for(int i=0;i<programmazione.getSala().getCapienza(); i++){
            if(i%10 == 0 && i != 0){ codice++; lettera = (char)codice; indice -= 10;}
            if(codice == 91){ codice = 65; lettera = (char)codice; indice += 10;}

            posti.add(new Posto(i,lettera+""+indice,"LIBERO"));
            indice++;
        }
        programmazione.setPosti(posti);
        Programmazione p = new Programmazione();
        p= programmazione;
        return ResponseEntity.ok(repository.save(p));
//        return ResponseEntity.ok("ok");
    }

    public ResponseEntity delete(List<Long> programmazioni) {
        programmazioni.forEach(p -> {
            repository.deleteById(p);
        });
        return ResponseEntity.ok("Programmazioni eliminate!");
    }
}
