package com.pigeonhouse.bdap.controller.filesystem;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.dao.ModuleDao;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.CodeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ModuleViewInfoController {

    @Autowired
    ModuleDao moduleDao;

    /**
     * 返回所有模块的参数信息
     *
     * @return
     */
    @GetMapping("/module")
    public Response returnSparkCode() {
        List<NodeInfo> all = moduleDao.findAll();
        return new Response(CodeStatus.CODE_PUT_SUCCESS, JSONObject.toJSON(all));
    }

}
