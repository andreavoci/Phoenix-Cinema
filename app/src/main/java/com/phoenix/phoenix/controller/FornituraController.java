package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Biglietto;
import com.phoenix.phoenix.entity.Fornitura;
import com.phoenix.phoenix.service.FornituraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/forniture")
public class FornituraController {
    private final FornituraService  service;

    @Autowired
    public FornituraController(FornituraService service){this.service=service;}


    @GetMapping
    public List<Fornitura> getAll(){
        return service.getAll();
    }

}
