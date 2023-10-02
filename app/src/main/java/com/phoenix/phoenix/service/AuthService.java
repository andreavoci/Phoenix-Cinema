package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.repository.AuthRepository;
import com.phoenix.phoenix.repository.UserRepository;
import com.phoenix.phoenix.utility.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    private UserRepository repository;

    @Autowired
    public AuthService(UserRepository repository) {
        this.repository = repository;
    }


    public ResponseEntity<String> login(String email, String password) {
        Optional<User> userByEmail = repository.findUserByEmail(email);
        System.out.println(userByEmail);
        if(userByEmail.isPresent()){
            System.out.println(userByEmail.get().getPassword());
            System.out.println(password);
            System.out.println("ciao"=="ciao");
            System.out.println(userByEmail.get().getPassword().equals(password));
            if(userByEmail.get().getPassword().equals(password)){
                String newtoken = Util.generateToken();
                userByEmail.get().setToken(newtoken);
                repository.save(userByEmail.get());
                return new ResponseEntity<String>("{\"token\":\""+newtoken+"\"}",HttpStatus.OK);
            }
            else{
                return new ResponseEntity<String>("Password sbagliata",HttpStatus.BAD_REQUEST);
//                        ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password sbagliata");
            }
        }
        else{
            return new ResponseEntity<String>("Email inesistente",HttpStatus.BAD_REQUEST);
        }
    }

//    public User saveCustomer(User savedUser) {
//        return repository.save(savedUser);
//    }
}