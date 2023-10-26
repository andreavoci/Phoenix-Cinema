package com.phoenix.phoenix.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;

@Entity
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Il campo jobTitle è obbligatorio")
    private String jobTitle;
    @NotBlank(message = "Il campo name è obbligatorio")
    private String name;
    @Email(message = "L'indirizzo email deve essere valido")
    private String email;
    @NotBlank (message = "Il campo phone è obbligatorio")
    private String phone;

}
