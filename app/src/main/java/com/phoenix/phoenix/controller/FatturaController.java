package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Fattura;
import com.phoenix.phoenix.service.FatturaService;
import com.phoenix.phoenix.service.VenditaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/fatture")
public class FatturaController {
    private final FatturaService service;

    @Autowired
    public FatturaController(FatturaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Fattura> getFatture(){ return service.getAll();}

    @PostMapping(path = "/update")
    public ResponseEntity effettuaPagamento(@RequestBody Long id){ return service.paga(id);}

}