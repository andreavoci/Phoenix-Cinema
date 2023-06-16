package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@NoArgsConstructor
public class Posto {
    //Sala(ID, nome, List(POSTI))

    private String numero;

    private String stato;
}
