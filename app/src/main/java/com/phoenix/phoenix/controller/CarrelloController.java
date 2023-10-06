package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.*;
import com.phoenix.phoenix.service.CarrelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/carrello")
public class CarrelloController {

    private final CarrelloService service;

    @Autowired
    public CarrelloController(CarrelloService service){ this.service=service;}

    @PostMapping
    public ResponseEntity getCart(@RequestBody AuthBody body){return service.getCart(body);}

    @PostMapping(path = "/add")
    public ResponseEntity addToCart(@RequestBody AuthBody<ElementoCarrello> body) {return service.addToCart(body);}


    @PostMapping(path = "/delete")
    public ResponseEntity deleteCart(@RequestBody AuthBody body) {return service.deleteCart(body);}




}
