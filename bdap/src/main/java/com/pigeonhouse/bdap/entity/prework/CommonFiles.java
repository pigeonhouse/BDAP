package com.pigeonhouse.bdap.entity.prework;

import com.pigeonhouse.bdap.entity.prework.attributes.FileAttribute;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author XingTianYu
 * @date 2019/9/24 16:55
 */
@Data
@AllArgsConstructor
public class CommonFiles {
    @Id
    String cid;
    String userId;
    String userName;
    List<FileAttribute> fileList;

    public CommonFiles() {
        this.fileList = new ArrayList<FileAttribute>();
    }


}