package com.phoenix.phoenix.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name="vendita")
public class Vendita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private User dipendente;

    @Convert(converter = ElementoVenditaConverter.class)
    private Collection<ElementoVendita> elementi;

    private double totale;

    private Date data;

}
