package com.phoenix.phoenix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="`biglietto`")
public class Biglietto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private Programmazione programmazione;

    private long posto;

    private double costo;

    @ManyToOne
    @JoinColumn(name = "ordine_id")
    @JsonIgnore
    private Ordine ordine;


    public Biglietto(Programmazione programmazione, long posto, double costo) {
        this.programmazione = programmazione;
        this.posto = posto;
        this.costo = costo;
    }
}
