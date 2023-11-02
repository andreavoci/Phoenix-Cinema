package com.phoenix.phoenix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@Entity
@Table(name = "merce")
public class Merce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private TipoMerce tipo;

    private double prezzo;

    private int quantita;

    @ManyToOne
    @JoinColumn(name = "fornitura")
    @JsonIgnore
    private Fornitura fornitura;

}
