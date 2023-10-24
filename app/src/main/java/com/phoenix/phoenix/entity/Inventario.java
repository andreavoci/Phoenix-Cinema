package com.phoenix.phoenix.entity;

public class Inventario {
    private long id;
    private String nome;
    private String tipo;//enum
    private double prezzo;
    private int quantitaInStock;//quantitaTot= quantitaInStock + quantitaEsposta
    private int quantitaEsposta;
}
