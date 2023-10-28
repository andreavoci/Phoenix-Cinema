package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Dipendente;
import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.service.DipendenteService;
import com.phoenix.phoenix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/dipendenti")
public class DipendenteController {
    private final DipendenteService service;
    @Autowired
    private UserService userService;

    @Autowired
    public DipendenteController(DipendenteService service){ this.service=service;}

    @GetMapping
    public List<Dipendente> getAll(){return service.getAll();}

    @GetMapping(path = "/{id}")
    public Optional<Dipendente> getDipendenteByUser(@PathVariable("id") Long userID){
        User user = userService.getUser(userID);
        return service.getDipendenteByUser(user);
    }

    @PostMapping(path = "/create")
    public ResponseEntity createDipendente(@RequestBody DipendenteBody body){
        return service.create(body.user, body.nome, body.cognome, body.cf, body.genere, body.data_nascita, body.indirizzo, body.telefono);
    }
}

class DipendenteBody{
    public User user;
    public String nome;
    public String cognome;
    public String cf;
    String genere;
    public Date data_nascita;
    public String indirizzo;
    public String telefono;
}
