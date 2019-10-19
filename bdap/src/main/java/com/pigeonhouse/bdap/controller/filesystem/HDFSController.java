package com.pigeonhouse.bdap.controller.filesystem;

import com.pigeonhouse.bdap.config.HdfsConfig;
import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.ResponseService;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.filesystem.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.filesystem.HdfsService;
import com.pigeonhouse.bdap.service.runcode.GetOutputService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.HdfsStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;

/**
 * 本文件所有Api均使用userId作为唯一性索引,在HDFS上的默认用户文件夹名称也为userId
 * HDFS文件的操作API
 *
 * @Author: Xingtianyu
 * @Date: 2019/9/19 20:38
 */
@RestController
public class HDFSController {

    @Autowired
    HdfsService hdfsService;
    @Autowired
    FileHeaderAttriService fileHeaderAttriService;
    @Autowired
    TokenService tokenService;
    @Autowired
    ResponseService responseService;
    @Autowired
    LivyDao livyDao;
    @Autowired
    GetOutputService getOutputService;

    @PutMapping("/hdfs")
    public Response upload(HttpServletRequest request) {
        try {
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            String token = tokenService.getTokenFromRequest(request, "loginToken");
            String userId = tokenService.getValueFromToken(token, "userId").asString();
            LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);
            MultipartFile file = multipartRequest.getFile("file");
            String fileName = file.getOriginalFilename();
            String[] splits = fileName.split("\\.");
            String type = splits[splits.length - 1];
            if (!"csv".equals(type) && !"txt".equals(type) && !"json".equals(type)) {
                return responseService.response(HdfsStatus.INVALID_INPUT, null, request);
            }
            hdfsService.upload(file, userId);

            String readDataCode = "val df = spark.read.format(\""+type+"\")" +
                    ".option(\"inferSchema\",\"true\").option(\"header\",\"true\")" +
                    ".load(\"hdfs:///bdap/students/"+userId+"/"+fileName+"\")\n";

            livyDao.postCode(readDataCode,livySessionInfo);

            String readSchemaDDL = "println(df.schema.toDDL)\n";

            String resultUrl = livyDao.postCode(readSchemaDDL,livySessionInfo);

            String schemaDDL = getOutputService.getOutput(resultUrl);

            System.out.println(schemaDDL);

            return responseService.response(HdfsStatus.FILE_UPLOAD_SUCCESS, null, request);

        } catch (Exception e) {
            return responseService.response(HdfsStatus.BACKEND_ERROR, null, request);
        }
    }
}
//
//    /**
//     * 将CSV文件上传至HDFS文件夹，并解析头文件存入数据库
//     * 返回值:带有提示信息的JSON字符串
//     * <p>
//     * file    文件传输流
//     * oppositePath 文件传输相对路径
//     * replace 如存在重名文件，是否覆盖标签
//     * regex   文件分隔符
//     */
//    @PostMapping("/hdfs/uploadwithheader")
//    @ResponseBody
//    public Object uploadwithheader(HttpServletRequest request) throws IOException {
//        try {
//            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
//            String token = tokenService.getTokenFromRequest(request, "loginToken");
//            //获取含有登录信息的Token
//            String userId = tokenService.getValueFromToken(token, "userId").asString();
//            String r = request.getParameter("replace");
//            Boolean replace = Boolean.valueOf(r);
//            Boolean withheader = Boolean.valueOf(request.getParameter("withHeader"));
//            String oppositePath = request.getParameter("oppositePath");
//            oppositePath = oppositePath == null ? "/" : oppositePath.startsWith("/") ? oppositePath : "/" + oppositePath;
//            //解析UserId
//            //char regex = request.getParameter("regex").charAt(0);
//            char regex = ',';
//            MultipartFile file = multipartRequest.getFile("file");
//            if (file == null || file.getBytes() == null) {
//                return responseService.response(HdfsStatus.INVALID_INPUT, null, request);
//            } else {
//                String[] type = file.getOriginalFilename().split("\\.");
//                List<String> header = new ArrayList<String>();
//                List<String> sample = new ArrayList<String>();
//                switch (type[type.length - 1]) {
//
//                    case "csv":
//                    case "txt":
//                        byte[] buf = file.getBytes();
//                        String tmp = "";
//                        boolean merge = false;
//                        boolean sampleread = false;
//                        for (int idx = 0; idx < buf.length; idx++) {
//                            if (buf[idx] == 10 && sampleread == true) {
//                                //遇到换行符且数据样本采集完毕跳出
//                                sample.add(tmp);
//                                tmp = "";
//                                break;
//                            } else if (buf[idx] == 10 && sampleread == false)
//                            //文件名读取完毕，采集数据样本
//                            {
//                                header.add(tmp);
//                                tmp = "";
//                                sampleread = true;
//                            } else if (idx == buf.length - 1)
//                            //数据只有一行
//                            {
//                                tmp += (char) buf[idx];
//                                sample.add(tmp);
//                            } else if (buf[idx] == (int) regex && sampleread == true && merge == false)
//                            //数据样本采集
//                            {
//                                sample.add(tmp);
//                                tmp = "";
//                            } else if (buf[idx] == (int) '"' && merge == false) {
//                                tmp += (char) buf[idx];
//                                merge = true;
//                            } else if (buf[idx] == (int) '"' && merge == true) {
//                                tmp += (char) buf[idx];
//                                merge = false;
//                            } else if (buf[idx] == (int) regex && sampleread == false)
//                            //遇到头文件分隔符，保存新数据
//                            {
//                                header.add(tmp);
//                                tmp = "";
//                            } else if (buf[idx] == 13)
//                            //回车符跳过
//                            {
//                                continue;
//                            } else {
//                                tmp += (char) buf[idx];
//                            }
//
//                        }
//                        buf = null;
//                        break;
//                    default:
//                        break;
//                }
//                for (int idx = 0; idx < sample.size(); idx++)
//                //将数据样本提取为数据格式
//                {
//                    sample.set(idx, fileHeaderAttriService.dataTypeCheck(sample.get(idx)));
//                }
//                Map<String, String> headermap = new HashMap<>(sample.size());
//                if (!withheader) {
//                    for (int i = 0; i < sample.size(); i++) {
//                        header.set(i, "column" + i + 1);
//                    }
//                }
//                if (sample.size() != header.size())
//                //如果数据样本或头字段有缺失，报输入非法错误
//                {
//
//                    return responseService.response(HdfsStatus.INVALID_INPUT, null, request);
//                } else {
//                    String status = hdfsService.upload(file, userId + oppositePath, replace);
//                    switch (status) {
//                        case "success":
//                            for (int idx = 0; idx < sample.size(); idx++) {
//                                //生成文件头信息
//                                headermap.put(header.get(idx), sample.get(idx));
//                            }
//                            HdfsConfig hdfsConfig = new HdfsConfig();
//                            //执行更新
//                            fileHeaderAttriService.saveOrUpdateFileHeader(file.getOriginalFilename(), hdfsConfig.getDefaultDirectory() + "/" + userId + "/" + file.getOriginalFilename(), headermap);
//                            return responseService.response(HdfsStatus.FILE_UPLOAD_SUCCESS, null, request);
//                        case "fileexist":
//                            return responseService.response(HdfsStatus.FILE_HAS_EXISTED, null, request);
//                        case "userinvalid":
//                            return responseService.response(HdfsStatus.USER_NOT_EXISTED, null, request);
//                        default:
//                            return null;
//                    }
//                }
//            }
//        } catch (Exception e) {
//            return responseService.response(HdfsStatus.BACKEND_ERROR, e.toString(), request);
//
//        }
//
//    }
//
//    /**
//     * 获取文件树函数
//     * 返回值:带有文件树的JSON字符串
//     */
//    @RequestMapping(value = "/hdfs/", method = RequestMethod.GET)
//    public Object getFileList(HttpServletRequest request) {
//        return getFileList(request, "/");
//    }
//
//    @RequestMapping(value = "/hdfs", method = RequestMethod.GET)
//    public Object getFileList(HttpServletRequest request, @RequestParam("oppositePath") String oppositePath) {
//        try {
//            String token = tokenService.getTokenFromRequest(request, "loginToken");
//            String userId = tokenService.getValueFromToken(token, "userId").asString();
//            oppositePath = oppositePath == null ? "/" : oppositePath.startsWith("/") ? oppositePath : "/" + oppositePath;
//            Hdfsfile fileList = hdfsService.listFiles(userId + oppositePath, null);
//            if (fileList != null) {
//                JSONObject fileListJson = new JSONObject(new LinkedHashMap());
//                for (int idx = 0; idx < fileList.getFilelist().size(); idx++) {
//                    JSONObject fileJson = new JSONObject(fileList.getFilelist().get(idx));
//                    fileListJson.put("fileInfo" + (idx + 1), fileJson);
//                }
//
//                return responseService.response(HdfsStatus.FILETREE_GET_SUCCESS, fileListJson, request);
//            } else {
//                return responseService.response(HdfsStatus.USER_NOT_EXISTED, null, request);
//            }
//        } catch (Exception e) {
//            return responseService.response(HdfsStatus.BACKEND_ERROR, e.toString(), request);
//        }
//    }
//
//    /**
//     * 创建HDFS文件夹函数
//     * 返回值:带有提示信息的JSON字符串
//     */
//    @RequestMapping(value = "/hdfs/", method = RequestMethod.PUT)
//    public Object mkdir(HttpServletRequest request) {
//        return mkdir(request, "/");
//    }
//
//    @RequestMapping(value = "/hdfs/{oppositePath}", method = RequestMethod.PUT)
//    public Object mkdir(HttpServletRequest request, @PathVariable String oppositePath) {
//        try {
//            String token = tokenService.getTokenFromRequest(request, "loginToken");
//            String userId = tokenService.getValueFromToken(token, "userId").asString();
//            String dirName = request.getParameter("dirName");
//            if (oppositePath.equals("/")) {
//                oppositePath = "";
//            }
//            boolean success = hdfsService.mkdir(userId + oppositePath + "/" + dirName);
//            if (success) {
//                return responseService.response(HdfsStatus.DIRECTORY_CREATE_SUCCESS, null, request);
//            } else {
//                return responseService.response(HdfsStatus.DIRECTORY_HAS_EXISTED, null, request);
//
//            }
//        } catch (Exception e) {
//            return responseService.response(HdfsStatus.BACKEND_ERROR, e.toString(), request);
//        }
//    }
//
//    /**
//     * 删除HDFS文件夹函数
//     * 返回值:带有提示信息的JSON字符串
//     */
//    @RequestMapping(value = "/hdfs/", method = RequestMethod.DELETE)
//    Object delete(HttpServletRequest request) {
//        return delete(request, "/");
//    }
//
//    @RequestMapping(value = "/hdfs/{oppositePath}", method = RequestMethod.DELETE)
//    public Object delete(HttpServletRequest request, @PathVariable String oppositePath) {
//        try {
//            String token = tokenService.getTokenFromRequest(request, "loginToken");
//            String userId = tokenService.getValueFromToken(token, "userId").asString();
//            String fileName = request.getParameter("fileName");
//            if (oppositePath.equals("/")) {
//                oppositePath = "";
//            }
//            boolean success = hdfsService.delete(userId + oppositePath + "/" + fileName);
//            if (success) {
//                return responseService.response(HdfsStatus.FILE_DELETE_SUCCESS, null, request);
//            } else {
//                return responseService.response(HdfsStatus.FILE_NOT_EXISTED, null, request);
//
//            }
//
//        } catch (Exception e) {
//            return responseService.response(HdfsStatus.BACKEND_ERROR, e.toString(), request);
//
//        }
//    }
//
//    /**
//     * 下载文件所用函数
//     * 返回值:文件流
//     */
//    @GetMapping("/hdfs/download/")
//    public Object download(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        return download(request, "/", response);
//    }
//
//    @GetMapping("/hdfs/download/{fileOppositePath}")
//    public Object download(HttpServletRequest request, @PathVariable String fileOppositePath, HttpServletResponse response) throws IOException {
//        try {
//            String token = tokenService.getTokenFromRequest(request, "loginToken");
//            //获取含有登录信息的Token
//            String userId = tokenService.getValueFromToken(token, "userId").asString();
//            //解析UserId
//            if (fileOppositePath.equals("/")) {
//                fileOppositePath = "";
//            }
//            //String fileName = request.getParameter("fileName");
//            if (StringUtils.isEmpty(fileOppositePath)) {
//                return responseService.response(HdfsStatus.INVALID_INPUT, null, request);
//            }
//            InputStream inputStream = (InputStream) hdfsService.download(userId + "/" + fileOppositePath);
//            if (inputStream != null) {
//
//                OutputStream os = response.getOutputStream();
//                byte[] b = new byte[4096];
//                int length;
//                while ((length = inputStream.read(b)) > 0) {
//                    os.write(b, 0, length);
//                }
//                os.close();
//                inputStream.close();
//                return null;
//                //下载成功直接返回文件流,没有状态码
//            } else {
//                return responseService.response(HdfsStatus.FILE_NOT_EXISTED, null, request);
//            }
//        } catch (Exception e) {
//            return responseService.response(HdfsStatus.BACKEND_ERROR, e.toString(), request);
//
//        }
//
//    }


