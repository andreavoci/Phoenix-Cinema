package com.phoenix.phoenix.entity;

import lombok.Data;

@Data
public class AuthBody<T> {
    private long id;

    private T body;

}

