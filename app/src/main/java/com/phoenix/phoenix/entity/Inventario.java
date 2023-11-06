package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table( name = "inventario")
@NoArgsConstructor
public class Inventario {

    public Inventario( String nome, TipoMerce tipo, double prezzo, int quantitaInStock, int quantitaEsposta) {
        this.nome = nome;
        this.tipo = tipo;
        this.prezzo = prezzo;
        this.quantitaInStock = quantitaInStock;
        this.quantitaEsposta = quantitaEsposta;
        this.quantitaTot = this.quantitaEsposta + this.quantitaInStock;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private TipoMerce tipo;//enum

    private double prezzo;

    private int quantitaInStock;//quantitaTot= quantitaInStock + quantitaEsposta

    private int quantitaEsposta;

    private int quantitaTot;

}

