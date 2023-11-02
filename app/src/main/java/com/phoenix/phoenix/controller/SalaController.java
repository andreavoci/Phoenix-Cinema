package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Sala;
import com.phoenix.phoenix.service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/sale")
public class SalaController {
    private final SalaService service;


    @Autowired
    public SalaController(SalaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Sala> getAll(){
        return service.getAll();
    }


    @PostMapping(path = "/create")
    public ResponseEntity create(@RequestBody Sala sala){
        return service.create(sala);
    }

    @PostMapping(path = "/update")
    public ResponseEntity update(@RequestBody Sala sala){ return service.update(sala); }

    @PostMapping(path = "/delete")
    public ResponseEntity delete(@RequestBody List<Long> sale){
        return service.delete(sale);
    }

}
