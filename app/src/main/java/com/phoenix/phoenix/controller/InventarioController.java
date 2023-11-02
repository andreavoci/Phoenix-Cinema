package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.service.FornituraService;
import com.phoenix.phoenix.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/inventario")
public class InventarioController {

    @Autowired
    public InventarioController(InventarioService service){this.service=service;}

    private final InventarioService service;

    @PostMapping(path = "/delete")
    public ResponseEntity delete(@RequestBody List<Long> merce){
        return service.deletemerce(merce);
    }

}
