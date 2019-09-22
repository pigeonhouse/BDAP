package com.pigeonhouse.bdap.entity.prework;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hdfsfile {
    private List<Map<String, Object>> filelist;

    public void setfilelist(Map<String,Object> file)
    {
        this.filelist.add(file);
    }
}
