package com.pigeonhouse.bdap.controller.filesystem;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.dao.CommonFilesDao;
import com.pigeonhouse.bdap.dao.ModuleDao;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.entity.metadata.CommonFiles;
import com.pigeonhouse.bdap.entity.metadata.FileAttribute;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.CodeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ModuleInfoController {

    @Autowired
    ModuleDao moduleDao;

    @Autowired
    CommonFilesDao commonFilesDao;

    @Autowired
    TokenService tokenService;

    /**
     * 返回所有模块的参数信息
     *
     * @return
     */
    @GetMapping("/module")
    public Response moduleInfo(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String userId = tokenService.getValueFromToken(token, "userId").asString();


        ArrayList<FileAttribute> fileList = commonFilesDao.findByUserId(userId);
        List<NodeInfo> moduleList = moduleDao.findAll();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("files",fileList);
        jsonObject.put("nodes",moduleList);

        return new Response(CodeStatus.CODE_PUT_SUCCESS, jsonObject);
    }

}
