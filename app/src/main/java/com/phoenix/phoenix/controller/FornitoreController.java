package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.Fornitore;
import com.phoenix.phoenix.service.FornitoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/fornitori")
public class FornitoreController {
    private final FornitoreService service;

    @Autowired
    public FornitoreController(FornitoreService service){this.service=service;}


    @GetMapping
    public List<Fornitore> getAll(){
        return service.getAll();
    }

}