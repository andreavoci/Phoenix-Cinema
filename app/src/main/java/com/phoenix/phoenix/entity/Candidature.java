package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name = "candidatura")
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private Mansione jobTitle;

    @NotBlank(message = "Il campo name è obbligatorio")
    private String name;

    @NotBlank(message = "Il campo name è obbligatorio")
    private String surname;

    @Email(message = "L'indirizzo email deve essere valido")
    private String email;

    public Candidature(String name, String surname, String email) {
        this.surname=surname;
        this.name=name;
        this.email=email;
    }

}
