package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.User;
import com.phoenix.phoenix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private UserRepository repository;
    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
    public List<User> getAllUsers(){
        return repository.findAll();
    }
    public User getUser(Long id){
        return repository.findById(id).get();
    }

    public User createDummyUser(User user){

        return repository.save(user);
    }

    public ResponseEntity create(User user) {
        Optional<User> userByEmail = repository.findUserByEmail(user.getEmail());
        if(userByEmail.isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email taken");
        }
        else{
            User u = new User(user.getNome(),user.getCognome(),user.getEmail(), encoder.encode(user.getPassword()));
            return ResponseEntity.ok(repository.save(user));
        }
    }

    public ResponseEntity update(User user) {
        Optional<User> oldUser = repository.findById(user.getId());
        if(oldUser.isPresent()){
            oldUser.get().setEmail(user.getEmail());
            return ResponseEntity.ok(repository.save(oldUser.get()));
        }
        return ResponseEntity.badRequest().body("no user with this id");
    }

    public ResponseEntity delete(Long id) {
        if(!repository.existsById(id)){
            return ResponseEntity.badRequest().body("no user with this id");
        }
        repository.deleteById(id);
        return ResponseEntity.ok("");
    }
//    public User saveCustomer(User savedUser) {
//        return repository.save(savedUser);
//    }


}
