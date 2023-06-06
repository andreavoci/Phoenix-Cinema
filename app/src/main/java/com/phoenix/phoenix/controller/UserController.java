package com.phoenix.phoenix.controller;

import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // fa capire al backend che questa classe contiene gli endpoint delle api
@RequestMapping("api/users") //l'endpoint che include tutte le api utente
public class UserController {
    private final UserService service;


    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Long id){
        return service.getUser(id);
    }

    @PostMapping(path = "/create")
    public ResponseEntity registerNewUser(@RequestBody User user){
        return service.create(user);
    }

    @PostMapping(path = "/update")
    public ResponseEntity updateUser(@RequestBody User user){
        return service.update(user);
    }

    @DeleteMapping(path = "delete/{user_id}")
    public ResponseEntity deleteUser(@PathVariable("user_id")Long id ){
        return service.delete(id);
    }

//    public User saveCustomer(User savedUser) {
//        return service.saveCustomer(savedUser);
//    }
}
