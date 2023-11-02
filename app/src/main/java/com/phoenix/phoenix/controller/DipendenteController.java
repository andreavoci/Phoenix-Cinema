package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Dipendente;
import com.phoenix.phoenix.entity.Mansione;
import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.service.DipendenteService;
import com.phoenix.phoenix.service.UserService;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
        return service.create(body.email, body.nome, body.cognome, body.cf, body.genere, body.data, body.indirizzo, body.telefono, body.mansione);
    }

    @PostMapping(path = "/update")
    public ResponseEntity updateDipendente(@RequestBody DipendenteBody body){
        System.out.println(body.email+","+ body.nome+","+body.cognome+","+body.cf+","+body.genere+","+ body.data+","+ body.indirizzo+","+body.telefono+","+body.mansione+","+body.userID);
        return service.update(body.email, body.nome, body.cognome, body.cf, body.genere, body.data, body.indirizzo, body.telefono, body.mansione, body.userID);
    }

    @PostMapping(path = "/delete")
    public ResponseEntity deleteDipendente(@RequestBody List<Long> dipendenti) {
        return service.delete(dipendenti);
    }
}

class DipendenteBody{
    public String email;
    public String nome;
    public String cognome;
    public String cf;
    public String genere;
    public Date data;
    public String indirizzo;
    public String telefono;
    @Enumerated(EnumType.STRING)
    public Mansione mansione;
    public long userID;
}