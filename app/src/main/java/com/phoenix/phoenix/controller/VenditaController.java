package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Biglietto;
import com.phoenix.phoenix.entity.ElementoVendita;
import com.phoenix.phoenix.entity.Inventario;
import com.phoenix.phoenix.entity.Vendita;
import com.phoenix.phoenix.service.SalaService;
import com.phoenix.phoenix.service.VenditaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("api/vendite")
public class VenditaController {
    private final VenditaService service;

    @Autowired
    public VenditaController(VenditaService service) {
        this.service = service;
    }

    @PostMapping(path = "/create")
    public ResponseEntity aggiungiVendita(@RequestBody VenditaBody body) { return this.service.create(body.userID, body.biglietti, body.elementi);}

}

class VenditaBody{
    public long userID;
    public Collection<Biglietto> biglietti;
    public Collection<ElementoVendita> elementi;
}
