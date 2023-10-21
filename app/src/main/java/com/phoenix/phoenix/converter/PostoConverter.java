package com.phoenix.phoenix.converter;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phoenix.phoenix.entity.Posto;
import jakarta.persistence.AttributeConverter;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Component;

import java.util.Collection;

//convertitore
@Component
public class PostoConverter implements AttributeConverter<Collection<Posto>, String> {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    @NotNull
    public String convertToDatabaseColumn(@NotNull Collection<Posto> myCustomObject) {
        try {
            return objectMapper.writeValueAsString(myCustomObject);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    @NotNull
    public Collection<Posto> convertToEntityAttribute(@NotNull String databaseDataAsJSONString) {
        try {
            return objectMapper.readValue(databaseDataAsJSONString,  new TypeReference<Collection<Posto>>(){});
        } catch (Exception ex) {
            return null;
        }
    }
}