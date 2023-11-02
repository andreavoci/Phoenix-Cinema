package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Dipendente;
import com.phoenix.phoenix.entity.Mansione;
import com.phoenix.phoenix.entity.RuoloUtente;
import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.repository.DipendenteRepository;
import com.phoenix.phoenix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DipendenteService {
    @Autowired
    public DipendenteRepository repository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public DipendenteService(DipendenteRepository repository){
        this.repository=repository;
    }

    public List<Dipendente> getAll(){
        return repository.findAll();
    }

    public Dipendente getDipendente(Long id){
        return repository.findById(id).get();
    }

    public ResponseEntity create(String email, String nome, String cognome, String cf, String genere, Date data_nascita, String indirizzo, String telefono, Mansione mansione){
        Optional<User> userByEmail = userRepository.findUserByEmail(email);
        if(userByEmail.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email not found");
        }else{
            userByEmail.get().setRuolo(RuoloUtente.DIPENDENTE);

            Dipendente d = new Dipendente(userByEmail.get(), nome, cognome, cf, genere, data_nascita, indirizzo, telefono);
            d.setMansione(mansione);
            return ResponseEntity.ok(repository.save(d));
        }
    }

    public ResponseEntity update(String email, String nome, String cognome, String cf, String genere, Date data_nascita, String indirizzo, String telefono, Mansione mansione, Long userID){
        Optional<User> userById = userRepository.findById(userID);
        if(userById.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }else{
            userById.get().setEmail(email);
            userRepository.save(userById.get());
            Optional<Dipendente> d = getDipendenteByUser(userById.get());
            System.out.println(d);
            if(!mansione.equals(""))
                d.get().setMansione(mansione);
            if(!nome.equals(""))
                d.get().setNome(nome);
            if(!cognome.equals(""))
                d.get().setCognome(cognome);
            if(!cf.equals(""))
                d.get().setCf(cf);
            if(!genere.equals(""))
                d.get().setGenere(genere);
            if(!data_nascita.equals(""))
                d.get().setData_nascita(data_nascita);
            if(!indirizzo.equals(""))
                d.get().setIndirizzo(indirizzo);
            if(!telefono.equals(""))
                d.get().setTelefono(telefono);
            System.out.println(d);
            return ResponseEntity.ok(repository.save(d.get()));
        }
    }

    public Optional<Dipendente> getDipendenteByUser(User user) {
        return repository.findDipendentiByUser(user);
    }

    public ResponseEntity delete(List<Long> dipendenti) {
        dipendenti.forEach(d -> {
            repository.deleteById(d);
        });
        return ResponseEntity.ok("Dipendenti eliminati!");
    }
}