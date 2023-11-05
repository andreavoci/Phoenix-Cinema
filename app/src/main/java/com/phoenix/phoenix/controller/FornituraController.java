package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Biglietto;
import com.phoenix.phoenix.entity.Fornitura;
import com.phoenix.phoenix.entity.Sala;
import com.phoenix.phoenix.service.FornituraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/forniture")
public class FornituraController {
    private final FornituraService  service;

    @Autowired
    public FornituraController(FornituraService service){this.service=service;}


    @GetMapping
    public List<Fornitura> getForniture(){
        return service.getAll();
    }

    @PostMapping(path = "/create")
    public ResponseEntity<String> creaFornitura(@RequestBody Fornitura fornitura){
        return service.create(fornitura);
    }

    @PostMapping(path = "/delete")
    public ResponseEntity rimuoviForniture(@RequestBody List<Long> forniture){
        return service.deleteFornitura(forniture);
    }

    @PostMapping(path = "/setDataArrivo")
    public ResponseEntity setDataArrivo(@RequestBody Fornitura fornitura) {return service.aggiungiDataArrivo(fornitura);}
}
