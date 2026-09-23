package com.ticketmanagement.exception;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Validation failure with optional per-field messages for the UI.
 */
public class ValidationException extends RuntimeException {

    private final Map<String, String> fields;

    public ValidationException(String message) {
        this(message, Map.of());
    }

    public ValidationException(String message, Map<String, String> fields) {
        super(message);
        this.fields = Collections.unmodifiableMap(new LinkedHashMap<>(fields));
    }

    public static ValidationException forField(String field, String message) {
        return new ValidationException("Please fix the highlighted fields.", Map.of(field, message));
    }

    public Map<String, String> getFields() {
        return fields;
    }
}
