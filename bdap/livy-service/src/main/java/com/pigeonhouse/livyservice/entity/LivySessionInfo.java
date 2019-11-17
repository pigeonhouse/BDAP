package com.pigeonhouse.livyservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LivySessionInfo implements Serializable {

    private String livyAddr;
    private int id;
    private String state;

    public LivySessionInfo(String livyAddr, int id) {
        this.livyAddr = livyAddr;
        this.id = id;
    }
}
