package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Biglietto;
import com.phoenix.phoenix.service.BigliettoService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/biglietti")
public class BigliettoController {

    private final BigliettoService service;

    @Autowired
    public BigliettoController(BigliettoService service){
        this.service = service;
    }

    @GetMapping
    public List<Biglietto> getAllTickets(){
        return service.getAllTickets();
    }

    @PostMapping(path = "/create")
    public ResponseEntity creaTicket(@RequestBody Biglietto biglietto){
        return service.create(biglietto);
    }

    @DeleteMapping(path = "/delete/{biglietto}")
    public ResponseEntity rimuoviTicket(@PathVariable("biglietto") Long id){
        return service.delete(id);
    }



    //
    /*
        GET

        https://google.com/getrequest/bruno
        client -> server bruno

        POST
        https://google.com/postrequest

        {
            "nome":"bruno";
            cognome:perri
            data:"dmdas
        }

     */

}
