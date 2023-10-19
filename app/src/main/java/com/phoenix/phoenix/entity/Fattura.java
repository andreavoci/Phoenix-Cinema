package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "fattura")
public class Fattura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double importo;

    private Date emissione;

    @ManyToOne
    private Fornitore fornitore;

    @OneToMany(mappedBy = "fattura")
    private List<Fornitura> forniture;
}
