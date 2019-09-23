package com.pigeonhouse.bdap.entity.prework;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class Hdfsfile {
    private List<Map<String, Object>> filelist;

    public Hdfsfile() {
        this.filelist = new ArrayList<Map<String, Object>>();
    }

    public void setfilelist(Map<String, Object> file) {
        this.filelist.add(file);
    }
}
