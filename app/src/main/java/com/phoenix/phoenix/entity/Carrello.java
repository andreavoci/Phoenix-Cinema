package com.phoenix.phoenix.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Data
@NoArgsConstructor
@Entity
@Table(name="carrello")
public class Carrello {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private User cliente;
//
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "carrello", orphanRemoval = true)
    private List<ElementoCarrello> elementi = new ArrayList<>();


//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "carrello_id")
//    private Collection<ElementoCarrello> elementi = new ArrayList<>();

    private double sconto;

    private Date data;

//    public void addElemento(ElementoCarrello elemento){
//        this.elementi.add(elemento);
//    }

    public Carrello(User cliente, List<ElementoCarrello> elementi, double sconto, Date data) {
        this.cliente = cliente;
//        this.elementi = elementi;
        this.sconto = sconto;
        this.data = data;
    }
}

