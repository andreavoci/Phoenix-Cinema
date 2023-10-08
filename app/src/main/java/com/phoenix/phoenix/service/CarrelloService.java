package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.*;
import com.phoenix.phoenix.repository.*;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class CarrelloService {

    private CarrelloRepository repository;

    @Autowired
    private OrdineRepository ordineRepository;

    @Autowired
    private ElementoCarrelloRepository elementoCarrelloRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    public CarrelloService(CarrelloRepository repository) {
        this.repository = repository;
    }

    public ResponseEntity getCart(AuthBody<?> authBody) {
        Optional<User> optUser = authService.authenticate(authBody);
        if(optUser.isPresent()){
            Optional<Carrello> optCarrello = repository.findCartByUserID(optUser.get());
            if(optCarrello.isPresent()){
                return ResponseEntity.ok(optCarrello.get());
            }
            else{
                return ResponseEntity.ok(Optional.empty());
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user doesn't exist");
        }
    }

    @Transactional
    public ResponseEntity addToCart(AuthBody<?> authBody){

        Object o = authBody.getBody();

        if(o instanceof ElementoCarrello){

            ElementoCarrello elemento = (ElementoCarrello) o;
            ResponseEntity response = getCart(authBody);

            if(response.getStatusCode().is2xxSuccessful()){
                if(response.getBody() instanceof Carrello){
                    Carrello carrello = (Carrello) response.getBody();

                    elemento.setCarrello(carrello);
                    carrello.getElementi().add(elemento);

                    repository.save(carrello);
                    return ResponseEntity.ok("updated correctly");
                }
                else{
                    Carrello newCarrello = new Carrello(authService.authenticate(authBody).get(),new ArrayList<>(),0, Calendar.getInstance().getTime());

                    elemento.setCarrello(newCarrello);
                    newCarrello.getElementi().add(elemento);

                    repository.save(newCarrello);
                    return ResponseEntity.ok("added correctly");
                }
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("malformed");
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("malformed");
        }
    }

    public ResponseEntity deleteCartElement(AuthBody<?> authBody){
        Optional<User> optUser = authService.authenticate(authBody);
        Object o = authBody.getBody();

        if(optUser.isPresent()) {
            Optional<Carrello> optCarrello = repository.findCartByUserID(optUser.get());
            if (optCarrello.isPresent()) {
                if (o instanceof Long) {
                    long elementoID = (long) o;
                    Optional<ElementoCarrello> elemento = elementoCarrelloRepository.findById(elementoID);
                    if (optCarrello.get().getElementi().contains(elemento.get())) {
                        optCarrello.get().getElementi().remove(elemento.get());
                        elementoCarrelloRepository.delete(elemento.get());
                        repository.save(optCarrello.get());
                        return ResponseEntity.ok("deleted correctly");
                    } else {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("cart doesn't contain element");
                    }
                }
                else{
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("malformed element");
                }
            }
            else{
                return ResponseEntity.ok("no cart");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user doesn't exist");
    }


    public ResponseEntity deleteCart(AuthBody authBody){
        Optional<User> optUser = authService.authenticate(authBody);
        if(optUser.isPresent()) {
            Optional<Carrello> optCarrello = repository.findCartByUserID(optUser.get());
            if (optCarrello.isPresent()) {
                repository.delete(optCarrello.get());
                return ResponseEntity.ok("deleted correctly");
            }
            else{
                return ResponseEntity.ok("no cart");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user doesn't exist");
    }

    public ResponseEntity checkout(AuthBody authBody){
        Optional<User> optUser = authService.authenticate(authBody);
        if(optUser.isPresent()) {
            Optional<Carrello> optCarrello = repository.findCartByUserID(optUser.get());
            if (optCarrello.isPresent()) {
                Ordine newOrdine = new Ordine(optUser.get(),new ArrayList<>(),optCarrello.get().getSconto(),Calendar.getInstance().getTime());
                if(!optCarrello.get().getElementi().isEmpty()){
                    optCarrello.get().getElementi().forEach(e->{
                        Biglietto newBiglietto = new Biglietto(e.getProgrammazione(),e.getPosto(),e.getCosto());
                        newBiglietto.setOrdine(newOrdine);
                        newOrdine.getBiglietti().add(newBiglietto);

                    });

                    ordineRepository.save(newOrdine);
                    repository.delete(optCarrello.get());

                    return ResponseEntity.ok("order created");
                }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("cart is empty");

            }
            else{
                return ResponseEntity.ok("no cart");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user doesn't exist");
    }

}
