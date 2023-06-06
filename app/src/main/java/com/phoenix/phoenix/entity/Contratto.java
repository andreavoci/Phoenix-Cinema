package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "contratto")
public class Contratto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


}
