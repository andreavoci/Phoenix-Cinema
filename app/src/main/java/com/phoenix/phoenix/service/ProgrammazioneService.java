package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Posto;
import com.phoenix.phoenix.entity.Programmazione;
import com.phoenix.phoenix.repository.ProgrammazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ProgrammazioneService {
    private ProgrammazioneRepository repository;

    @Autowired
    public ProgrammazioneService(ProgrammazioneRepository repository){this.repository=repository;}

    public Optional<Programmazione> getById(long id){return repository.findById(id);}

    public List<Programmazione> getAll(){return repository.findAll();}

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
        return ResponseEntity.ok("Candidature eliminate!");
    }
}
