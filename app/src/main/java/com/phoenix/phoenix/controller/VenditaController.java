package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Biglietto;
import com.phoenix.phoenix.entity.ElementoVendita;
import com.phoenix.phoenix.entity.Inventario;
import com.phoenix.phoenix.entity.Vendita;
import com.phoenix.phoenix.service.SalaService;
import com.phoenix.phoenix.service.VenditaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("api/vendite")
public class VenditaController {
    private final VenditaService service;

    @Autowired
    public VenditaController(VenditaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Vendita> getVendite(){return service.getAll();}

    @PostMapping(path = "/create")
    public ResponseEntity aggiungiVendita(@RequestBody VenditaBody body) { return this.service.create(body.userID, body.biglietti, body.elementi);}

//    @PostMapping(path = "/delete")
//    public ResponseEntity rimuoviVendita(@RequestBody Long id){ return service.delete(id);}
}

class VenditaBody{
    public long userID;
    public Collection<Biglietto> biglietti;
    public Collection<ElementoVendita> elementi;
}
