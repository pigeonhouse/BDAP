package com.pigeonhouse.experimentservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavedModel {
    String modelId;
    String userId;
    String name;
    String elabel;
}
