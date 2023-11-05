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

    private String cf;

    private String genere;

    private Date data_nascita;

    private String indirizzo;

    private String telefono;

    @Enumerated(EnumType.STRING)
    private Mansione mansione;

    public Dipendente(User user, String cf, String genere, Date data_nascita, String indirizzo, String telefono){
        this.userID = user;
        this.cf=cf;
        this.genere=genere;
        this.data_nascita=data_nascita;
        this.indirizzo=indirizzo;
        this.telefono=telefono;
    }
}
