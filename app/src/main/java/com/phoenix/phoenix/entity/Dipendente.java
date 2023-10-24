package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name="dipendenti")
public class Dipendente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User userID;

    private String nome;

    private String cognome;

    private String cf;

    private String genere;

    private Date data_nascita;

    private String indirizzo;

    private String telefono;

    @Enumerated(EnumType.STRING)
    private Mansione mansione;
}
