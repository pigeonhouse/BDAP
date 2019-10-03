package com.pigeonhouse.bdap.controller.filesystem;

import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.CodeStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SparkCodeController {


    /**
     * 返回算法模块的参数信息
     *
     * @return 算法模块名称和参数
     */
//    @PostMapping("/module")
//    public Response returnSparkCode() {
//        List<String> all = sparkCodeDao.findAllToJson();
//        return new Response(CodeStatus.CODE_PUT_SUCCESS, all.toString());
//    }

}
