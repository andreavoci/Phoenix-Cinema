package com.phoenix.phoenix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "pellicola")
public class Pellicola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String titolo;

    @ManyToOne
    @JoinColumn(name = "id_fornitura")
    @JsonIgnore
    private Fornitura fornitura;

    private Date data_uscita;

    private int durata;

    private String generi;

    private String trama;

    private int pegi;

    private String regista;

    private String attori;

    private double prezzo_noleggio;

    private String locandina;

    private String trailer;

    private Date fine_noleggio;

    public Pellicola(String titolo, Fornitura fornitura, Date data_uscita, int durata, String genere, String trama, int pegi, String regista, String attori, String locandina, String trailer, double prezzo_noleggio, Date noleggio){
        this.titolo=titolo;
        this.fornitura=fornitura;
        this.data_uscita=data_uscita;
        this.durata=durata;
        this.generi=genere;
        this.trama=trama;
        this.pegi=pegi;
        this.regista=regista;
        this.attori=attori;
        this.locandina=locandina;
        this.trailer=trailer;
        this.prezzo_noleggio=prezzo_noleggio;
        this.fine_noleggio=noleggio;
    }
}
