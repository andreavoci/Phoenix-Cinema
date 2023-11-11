package com.phoenix.phoenix.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name="vendita")
public class Vendita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private Dipendente dipendente;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "vendita", orphanRemoval = true)
    private Collection<ElementoVendita> elementi;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "vendita", orphanRemoval = true)
    private Collection<Biglietto> biglietti;

    private double totale;

    private Date data;

    public Vendita(Dipendente dipendente, Collection<ElementoVendita> elementi, Collection<Biglietto> biglietti){
        this.dipendente=dipendente;
        this.elementi=elementi;
        this.biglietti=biglietti;
        this.data = new Date();
    }

}
