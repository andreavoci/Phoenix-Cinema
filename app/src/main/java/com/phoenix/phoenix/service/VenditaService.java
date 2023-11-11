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
public class VenditaService {
    private VenditaRepository repository;
    @Autowired
    private BigliettoRepository bigliettoRepository;
    @Autowired
    private ProgrammazioneRepository programmazioneRepository;
    private final InventarioRepository inventarioRepository;
    private final ElementoVenditaRepository elementoVenditaRepository;
    private final DipendenteRepository dipendenteRepository;
    private final UserRepository userRepository;

    @Autowired
    public VenditaService(VenditaRepository repository,
                          InventarioRepository inventarioRepository,
                          ElementoVenditaRepository elementoVenditaRepository,
                          DipendenteRepository dipendenteRepository,
                          UserRepository userRepository){ this.repository = repository;
        this.inventarioRepository = inventarioRepository;
        this.elementoVenditaRepository = elementoVenditaRepository;
        this.dipendenteRepository = dipendenteRepository;
        this.userRepository = userRepository;
    }

    public List<Vendita> getAll() {return repository.findAll();}

    public ResponseEntity create(Long userID, Collection<Biglietto> biglietti, Collection<ElementoVendita> elementi){
        Optional<User> user = userRepository.findById(userID);
        Optional<Dipendente> dipendente = dipendenteRepository.findDipendentiByUser(user.get());
        if(dipendente.isEmpty()){
            return ResponseEntity.badRequest().body("Dipendente inesistente!");
        }
        double totale=0;
        if(!biglietti.isEmpty()){
            Programmazione programmazione;
            Vendita vendita = new Vendita(dipendente.get(),null, biglietti);
            repository.save(vendita);
            for(Biglietto b : biglietti){
                totale+=b.getCosto();
                long posto = b.getPosto();
                programmazione=b.getProgrammazione();
                Collection<Posto> posti = programmazione.getPosti();
                for(Posto p : posti){
                    if(p.getId()==posto)
                        p.setStato("OCCUPATO");
                }
                programmazione.setPosti(posti);
                programmazioneRepository.save(programmazione);
                b.setProgrammazione(programmazione);
                b.setVendita(vendita);
                bigliettoRepository.save(b);
            }
            vendita.setTotale(totale);
            return ResponseEntity.ok().body(repository.save(vendita));
        }else if(!elementi.isEmpty()){
            Vendita vendita = new Vendita(dipendente.get(),elementi, null);
            repository.save(vendita);
            for(ElementoVendita ev : elementi){
                totale+=ev.getCosto();
                Optional<Inventario> inventarioOptional = inventarioRepository.findById(ev.getMerce().getId());
                if(inventarioOptional.isPresent()) {
                    inventarioOptional.get().setQuantitaEsposta(inventarioOptional.get().getQuantitaEsposta() - ev.getQuantita());
                    inventarioOptional.get().setQuantitaTot(inventarioOptional.get().getQuantitaTot() - ev.getQuantita());
                    inventarioRepository.save(inventarioOptional.get());
                    ev.setVendita(vendita);
                    elementoVenditaRepository.save(ev);
                }else{
                    return ResponseEntity.badRequest().body("Merce non presente!");
                }
            }
            vendita.setTotale(totale);
            return ResponseEntity.ok().body(repository.save(vendita));
        }
        return ResponseEntity.badRequest().body("Vendita non registrata!");
    }

//    public ResponseEntity delete(Long id) {
//        Optional<Vendita> venditaDB = repository.findById(id);
//        if(venditaDB.isPresent()){
//
//        }
//    }
}
