package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.AuthBody;
import com.phoenix.phoenix.entity.Carrello;
import com.phoenix.phoenix.entity.Ordine;
import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.repository.OrdineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrdineService {

    private OrdineRepository repository;

    @Autowired
    private AuthService authService;

    public OrdineService(OrdineRepository repository){this.repository=repository;}

    public List<Ordine> getAll(AuthBody<?> authBody){
        Optional<User> optUser = authService.authenticate(authBody);

        if(optUser.isPresent()) {
            return repository.findOrdersByUserID(optUser.get());
        }
        return new ArrayList<>();
    }
}
