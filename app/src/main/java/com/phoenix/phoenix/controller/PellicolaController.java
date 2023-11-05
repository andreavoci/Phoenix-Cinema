package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Mansione;
import com.phoenix.phoenix.entity.Pellicola;
import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.service.PellicolaService;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/pellicole")
public class PellicolaController {
    private final PellicolaService service;

    @Autowired
    public PellicolaController(PellicolaService service){ this.service=service;}

    @GetMapping
    public List<Pellicola> getAllMovies(){return service.getAllMovies();}

    @GetMapping("/{id}")
    public Pellicola getPellicola(@PathVariable("id") Long id){
        return service.getPellicola(id);
    }

    @PostMapping(path = "/create")
    public ResponseEntity create(@RequestBody Pellicola pellicola){return service.create(pellicola);}

    @PostMapping(path = "/update")
    public ResponseEntity update(@RequestBody Pellicola pellicola){
        return service.update(pellicola);
//        return service.update(body.id_pellicola,body.titolo, body.data, body.durata, body.generi, body.pegi, body.trama, body.regista, body.attori, body.trailer, body.locandina, body.id_fornitura);
    }

    @PostMapping(path = "/delete")
    public ResponseEntity delete(@RequestBody List<Long> pellicole){return service.delete(pellicole);}
}

class PellicolaBody{
    public long id_pellicola;
    public String titolo;
    public Date data;
    public int durata;
    public String generi;
    public int pegi;
    public String trama;
    public String regista;
    public String attori;
    public String trailer;
    public String locandina;
    public long id_fornitura;
}
