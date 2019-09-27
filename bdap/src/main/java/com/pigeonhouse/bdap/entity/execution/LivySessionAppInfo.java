package com.pigeonhouse.bdap.entity.execution;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LivySessionAppInfo implements Serializable {

    private String driverLogUrl;

    private String sparkUiUrl;
}
