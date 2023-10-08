package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.AuthBody;
import com.phoenix.phoenix.entity.Ordine;
import com.phoenix.phoenix.service.OrdineService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/api/ordini")
public class OrdineController {

    private final OrdineService service;

    public OrdineController(OrdineService service){this.service=service;}

    @PostMapping
    public List<Ordine> getAll(@RequestBody AuthBody<String> authBody){return service.getAll(authBody);}

}
