package com.phoenix.phoenix.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "reso")
public class Reso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private Ordine ordine;

    private Date data;

    private String stato;

}
