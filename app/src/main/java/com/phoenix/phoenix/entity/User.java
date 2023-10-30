package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="`user`")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;

    private String cognome;

    private String email;

    private String password;

    private String token;

    @Enumerated(EnumType.STRING)
    private RuoloUtente ruolo;

    public User(String email, String password){
        this.email=email;
        this.password=password;
        this.ruolo=RuoloUtente.CLIENTE;
    }
}
