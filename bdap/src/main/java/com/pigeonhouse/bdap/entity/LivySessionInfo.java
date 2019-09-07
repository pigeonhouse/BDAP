package com.pigeonhouse.bdap.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LivySessionInfo implements Serializable {

    private int id;
    private String appId;
    private String owner;
    private String proxyUser;
    private String state;
    private String kind;
    private List<String> log;

}
