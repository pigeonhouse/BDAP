package com.pigeonhouse.experimentservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperimentDescription implements Serializable {
    String experimentId;
    String userId;
    String title;
    String description;
}
