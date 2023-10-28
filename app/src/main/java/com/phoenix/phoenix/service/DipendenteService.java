package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Dipendente;
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

    public ResponseEntity create(User user, String nome, String cognome, String cf, String genere, Date data_nascita, String indirizzo, String telefono){
        Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if(userByEmail.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email not found");
        }else{
            user.setRuolo(RuoloUtente.DIPENDENTE);
            Dipendente d = new Dipendente(user, nome, cognome, cf, genere, data_nascita, indirizzo, telefono);
            return ResponseEntity.ok(repository.save(d));
        }
    }

    public Optional<Dipendente> getDipendenteByUser(User user) {
        return repository.findDipendentiByUser(user);
    }
}
