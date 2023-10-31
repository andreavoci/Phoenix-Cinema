package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "fornitura")
public class Fornitura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Fornitore fornitore;

    @OneToOne(cascade = CascadeType.ALL)
    private Fattura fattura;

    private Date arrivo;

    private Date scadenza;

    private double prezzo;

    private int quantita;

    private String stato;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "fornitura")
    private List<Merce> merci = new ArrayList<>();
}