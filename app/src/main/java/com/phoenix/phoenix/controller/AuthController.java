package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.service.AuthService;
import com.phoenix.phoenix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // fa capire al backend che questa classe contiene gli endpoint delle api
@RequestMapping("api/auth") //l'endpoint che include tutte le api utente
public class AuthController {
    private final AuthService service;

    @Autowired
    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody LoginBody body){return service.login(body.email, body.password);}

    @PostMapping(path = "/register")
    public ResponseEntity<String> register(@RequestBody RegisterBody body){return service.register(body.nome, body.cognome,body.email, body.password);}

//    public User saveCustomer(User savedUser) {
//        return service.saveCustomer(savedUser);
//    }
}

class LoginBody {
    public String email;
    public String password;
}
class RegisterBody {
    public String nome;
    public String cognome;
    public String email;
    public String password;
}

