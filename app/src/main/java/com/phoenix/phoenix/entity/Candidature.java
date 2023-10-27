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

    @NotBlank(message = "Il campo jobTitle è obbligatorio")
    private String jobTitle;
    @NotBlank(message = "Il campo name è obbligatorio")
    private String name;
    @Email(message = "L'indirizzo email deve essere valido")
    private String email;
    @NotBlank (message = "Il campo phone è obbligatorio")
    private String phone;

    public Candidature(String jobTitle, String name, String email, String phone) {
        this.jobTitle=jobTitle;
        this.name=name;
        this.email=email;
        this.phone=phone;
    }

}
