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

//    @NotBlank(message = "Nome mancante!")
    @Size(max = 50)
    private String nome;

//    @NotBlank(message = "Tipo mancante!")
    private String tipo;

//    @NotBlank(message = "Prezzo mancante!")
    private double prezzo; //double o string?

    @ManyToOne
    @JoinColumn(name = "id_fornitore")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private Fornitore fornitore;
}
