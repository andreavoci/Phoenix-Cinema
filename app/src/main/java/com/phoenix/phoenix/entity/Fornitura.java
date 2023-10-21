package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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

    @ManyToOne
    private Fattura fattura;

    private String tipo;

    private Date arrivo;

    private Date scadenza;

    private double prezzo;

    private int quantita;

    private String stato;

}