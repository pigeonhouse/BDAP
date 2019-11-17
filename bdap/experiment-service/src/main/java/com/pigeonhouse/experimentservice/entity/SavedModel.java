package com.pigeonhouse.experimentservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavedModel  implements Serializable {
    String modelId;
    String userId;
    String name;
    String elabel;
    String algorithmType;
}
