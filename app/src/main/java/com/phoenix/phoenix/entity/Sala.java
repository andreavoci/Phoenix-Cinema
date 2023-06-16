package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name="sala")
public class Sala {
    //Sala(ID, nome, List(POSTI))
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;

    //private Collection<Posto> posti;
}
