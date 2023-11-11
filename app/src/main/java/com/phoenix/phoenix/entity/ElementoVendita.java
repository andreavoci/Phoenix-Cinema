package com.phoenix.phoenix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ElementoVendita implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private Inventario merce;

    private int quantita;

    private double costo;

    @ManyToOne
    @JoinColumn(name = "vendita_id")
    @JsonIgnore
    private Vendita vendita;

}

//convertitore
class ElementoVenditaConverter implements AttributeConverter<Collection<ElementoVendita>, String> {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    @NotNull
    public String convertToDatabaseColumn(@NotNull Collection<ElementoVendita> myCustomObject) {
        try {
            return objectMapper.writeValueAsString(myCustomObject);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    @NotNull
    public Collection<ElementoVendita> convertToEntityAttribute(@NotNull String databaseDataAsJSONString) {
        try {
            return objectMapper.readValue(databaseDataAsJSONString,  new TypeReference<Collection<ElementoVendita>>(){});
        } catch (Exception ex) {
            return null;
        }
    }
}