package com.phoenix.phoenix.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "fornitore")
public class Fornitore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @NotBlank(message = "Regione Sociale mancante!")
private String regione_sociale;

    //    @NotBlank(message = "Tipo mancante!")
    private String tipo;

//    @NotBlank(message = "Indirizzo mancante!")
    private String indirizzo;

    @Email
//    @NotBlank(message = "Email mancante!")
    @Size(max = 50)
    private String email;

//    @NotBlank(message = "Telefono mancante!")
    @Size(max = 50)
    private String telefono;


}
