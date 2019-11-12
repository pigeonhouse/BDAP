package com.pigeonhouse.experimentservice.entity.nodeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewCol implements Serializable {
    String mode;
    String name;
    String value;
}
