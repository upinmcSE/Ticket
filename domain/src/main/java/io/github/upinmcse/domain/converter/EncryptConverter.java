package io.github.upinmcse.domain.converter;

import jakarta.persistence.AttributeConverter;

public class EncryptConverter implements AttributeConverter<String, String> {
    @Override
    public String convertToDatabaseColumn(String attribute) {
        return "";
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return "";
    }
}
