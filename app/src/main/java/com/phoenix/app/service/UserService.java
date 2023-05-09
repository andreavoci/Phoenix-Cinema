package com.phoenix.app.service;


import com.phoenix.app.model.User;
import com.phoenix.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private UserRepository repository;

    @Autowired
    public UserService(UserRepository repository){ this.repository = repository;}

    public List<User> getAll() {return repository.findAll();}
}
