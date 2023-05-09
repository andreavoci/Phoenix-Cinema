package com.phoenix.app.controller;


import com.phoenix.app.model.User;
import com.phoenix.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // fa capire al backend che questa classe contiene gli endpoint delle api
@RequestMapping("api/users") //l'endpoint che include tutte le api utente
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service){ this.service = service;}

    @GetMapping
    public List<User> getAll(){return service.getAll();}
}
