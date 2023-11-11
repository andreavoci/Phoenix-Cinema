package com.phoenix.phoenix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "ordine")
public class Ordine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private User cliente;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "ordine")
    private List<Biglietto> biglietti = new ArrayList<>();

    private double totale;

    private Date data;

    @OneToOne
    @JsonIgnore
    private Reso reso;

    public Ordine(User cliente, List<Biglietto> biglietti, Date data) {
        this.cliente = cliente;
        this.biglietti = biglietti;
        this.data = data;
    }
}
