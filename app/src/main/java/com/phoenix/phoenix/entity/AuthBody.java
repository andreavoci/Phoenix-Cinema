package com.phoenix.phoenix.entity;

import lombok.Data;

@Data
public class AuthBody<T> {
    private long id;
//    private long token;
    private T body;

}

