package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Inventario;
import com.phoenix.phoenix.service.FornituraService;
import com.phoenix.phoenix.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/inventario")
public class InventarioController {

    @Autowired
    public InventarioController(InventarioService service){this.service=service;}

    private final InventarioService service;

    @GetMapping
    public List<Inventario> getInventarioCompleto() {return service.getAll();}

    @PostMapping(path = "/delete")
    public ResponseEntity rimuoviMerci(@RequestBody List<Long> merce){
        return service.deletemerce(merce);
    }



}
