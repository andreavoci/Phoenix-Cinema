package com.phoenix.phoenix.entity;

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
public class ElementoCarrello implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "programmazione")
    private Programmazione programmazione;

    private long posto;

    private double costo;

}



//convertitore
class ElementoCarrelloConverter implements AttributeConverter<Collection<ElementoCarrello>, String> {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    @NotNull
    public String convertToDatabaseColumn(@NotNull Collection<ElementoCarrello> myCustomObject) {
        try {
            return objectMapper.writeValueAsString(myCustomObject);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    @NotNull
    public Collection<ElementoCarrello> convertToEntityAttribute(@NotNull String databaseDataAsJSONString) {
        try {
            return objectMapper.readValue(databaseDataAsJSONString,  new TypeReference<Collection<ElementoCarrello>>(){});
        } catch (Exception ex) {
            return null;
        }
    }
}