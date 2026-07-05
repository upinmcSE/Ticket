package io.github.upinmcse.controller.util;

import io.github.upinmcse.controller.model.ApiResponse;
import io.github.upinmcse.controller.model.ApiResponseCode;

public class ResultUtil<T> {

    private final ApiResponse<T> apiResponse;

    private static final Integer SUCCESS_CODE = 200;

    public ResultUtil() {
        apiResponse = new ApiResponse<>();
        apiResponse.setSuccess(true);
        apiResponse.setMessage("success");
        apiResponse.setCode(SUCCESS_CODE);
    }

    public ApiResponse<T> setData(T t) {
        this.apiResponse.setResult(t);
        return this.apiResponse;
    }

    public ApiResponse<T> setSuccessMsg(ApiResponseCode ApiResponseCode) {
        this.apiResponse.setSuccess(true);
        this.apiResponse.setMessage(ApiResponseCode.message());
        this.apiResponse.setCode(ApiResponseCode.code());
        return this.apiResponse;

    }

    public static <T> ApiResponse<T> data(T t) {
        return new ResultUtil<T>().setData(t);
    }

    public static <T> ApiResponse<T> success(ApiResponseCode responseStatusCode) {
        return new ResultUtil<T>().setSuccessMsg(responseStatusCode);
    }

    public static <T> ApiResponse<T> success() {
        return new ResultUtil<T>().setSuccessMsg(ApiResponseCode.SUCCESS);
    }

    public static <T> ApiResponse<T> error(ApiResponseCode responseStatusCode) {
        return new ResultUtil<T>().setErrorMsg(responseStatusCode);
    }

    public static <T> ApiResponse<T> error(Integer code, String msg) {
        return new ResultUtil<T>().setErrorMsg(code, msg);
    }

    public ApiResponse<T> setErrorMsg(ApiResponseCode ApiResponseCode) {
        this.apiResponse.setSuccess(false);
        this.apiResponse.setMessage(ApiResponseCode.message());
        this.apiResponse.setCode(ApiResponseCode.code());
        return this.apiResponse;
    }

    public ApiResponse<T> setErrorMsg(Integer code, String msg) {
        this.apiResponse.setSuccess(false);
        this.apiResponse.setMessage(msg);
        this.apiResponse.setCode(code);
        return this.apiResponse;
    }
}
