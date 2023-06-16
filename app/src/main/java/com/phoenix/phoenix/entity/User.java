package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name="`user`")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @NotBlank(message = "Nome mancante!")
    @Size(max = 50)
    private String nome;

//    @NotBlank(message = "Cognome mancante!")
    @Size(max = 50)
    private String cognome;

//    @NotBlank(message = "Codice Fiscale mancante!")
    @Size(max = 50)
    private String cf;

//    @NotBlank(message = "Genere mancante!")
    @Size(max = 50)
    private String genere;

//    @NotBlank(message = "Data di nascita mancante!")
    private Date data_nascita;

//    @NotBlank(message = "Residenza mancante!")
    @Size(max = 50)
    private String residenza;

//    @NotBlank(message = "Email mancante!")
    @Size(max = 50)
    @Email
    @Basic
    private String email;

//    @NotBlank(message = "Password mancante!")
    @Size(max = 120)
    private String password;

    private String token;

}
