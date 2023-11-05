package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Fornitore;
import com.phoenix.phoenix.entity.TipoFornitore;
import com.phoenix.phoenix.service.FornitoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/fornitori")
public class FornitoreController {
    private final FornitoreService service;

    @Autowired
    public FornitoreController(FornitoreService service){this.service=service;}

    @PostMapping(path = "/create")
    public ResponseEntity creaFornitore(@RequestBody FornitoreBody body){
        return service.create(body.ragione_sociale,body.tipo, body.indirizzo, body.telefono, body.email);
    }
    @GetMapping
    public List<Fornitore> getFornitori(){
        return service.getAll();
    }

    @PostMapping(path = "/update")
    public ResponseEntity modificaFornitore(@RequestBody FornitoreBody body){
        return service.update(body.id,body.ragione_sociale,body.tipo, body.indirizzo, body.telefono, body.email);
    }

    @PostMapping(path = "/delete")
    public ResponseEntity rimuoviFornitori(@RequestBody List<Long> fornitori) {
        return service.delete(fornitori);
    }

}
class FornitoreBody{
    public String ragione_sociale;
    public TipoFornitore tipo;
    public String indirizzo;

    public String email;
    public String telefono;

    public long id;
}