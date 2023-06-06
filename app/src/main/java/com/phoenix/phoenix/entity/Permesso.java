package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "permesso")
public class Permesso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

}
