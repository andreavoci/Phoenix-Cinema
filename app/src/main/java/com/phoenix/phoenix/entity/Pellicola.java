package com.phoenix.phoenix.entity;

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

    //    @NotBlank(message = "Titolo mancante!")
    private String titolo;

    @ManyToOne
    @JoinColumn(name = "id_fornitore")
    private Fornitore fornitore;

    private Date data_uscita;

    private int durata;

    private Set<MovieGenre> generi = new HashSet<>();

    private String trama;

    private int pegi;

    private String cast;

    private double prezzo_noleggio;

    private String locandina;

    private String trailer;

    private Date fine_noleggio;

    public Pellicola(String titolo, Fornitore fornitore, Date data_uscita, int durata, Set<MovieGenre> generi, String trama, int pegi, String cast, String locandina, String trailer, double prezzo_noleggio, Date noleggio){
        this.titolo=titolo;
        this.fornitore=fornitore;
        this.data_uscita=data_uscita;
        this.durata=durata;
        this.generi=generi;
        this.trama=trama;
        this.pegi=pegi;
        this.cast=cast;
        this.locandina=locandina;
        this.trailer=trailer;
        this.prezzo_noleggio=prezzo_noleggio;
        this.fine_noleggio=noleggio;
    }
}
