package io.github.upinmcse.controller.model;

public enum ApiResponseCode {
    SUCCESS(200, "Thành công"),
    ;

    private final Integer code;
    private final String message;


    ApiResponseCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer code() {
        return this.code;
    }

    public String message() {
        return this.message;
    }
}
