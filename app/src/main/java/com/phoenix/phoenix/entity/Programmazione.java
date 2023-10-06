package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "programmazione")
public class Programmazione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private Pellicola pellicola;

    @OneToOne
    private Sala sala;

    @Convert(converter = PostoConverter.class)
    private Collection<Posto> posti;

    private double prezzo;

    private Date orario;

}
