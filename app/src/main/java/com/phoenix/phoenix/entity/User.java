package com.phoenix.phoenix.entity;

import com.phoenix.phoenix.entity.Ruolo;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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

    private String cf;

    private String genere;

    private Date data_nascita;

    private String indirizzo;

    private String telefono;

    private String email;

    private String password;

    private String token;

    @Enumerated(EnumType.STRING)
    private Ruolo ruolo;

}
