package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "fornitore")
public class Fornitore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String ragione_sociale;

    @Enumerated(EnumType.STRING)
    private TipoFornitore tipo;

    private String indirizzo;

    private String email;

    private String telefono;

    public Fornitore(String ragione_sociale, TipoFornitore tipo, String indirizzo, String telefono,String email){

        this.ragione_sociale=ragione_sociale;
        this.tipo=tipo;
        this.indirizzo=indirizzo;
        this.telefono=telefono;
        this.email=email;
    }

}
