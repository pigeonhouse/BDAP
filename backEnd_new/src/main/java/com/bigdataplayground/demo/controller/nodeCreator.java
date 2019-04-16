//package com.bigdataplayground.demo.controller;
//
//import com.alibaba.fastjson.JSON;
//import com.alibaba.fastjson.JSONArray;
//import com.alibaba.fastjson.JSONObject;
//
//public class nodeCreator {
//    String id ;
//    String label;
//    JSONObject attribute;
//    JSONArray sourceID;
//    JSONObject labelArray;
//    String fileName;
//    public nodeCreator(String id, String label, JSONArray sourceID,JSONObject attribute,  JSONObject labelArray,String fileName){
//        this.id = id;
//        this.label = label;
//        this.attribute = attribute;
//        this.sourceID = sourceID;
//        this.labelArray = labelArray;
//        this.fileName = fileName;
//    }
//
//    static String ArraytoString(String str){
//        String sub = str.substring(2,str.length()-2);
//        String array[] = sub.split("\",\"");
//        StringBuilder sb = new StringBuilder();
//        for (int i = 0; i <array.length ; i++) {
//            sb.append(array[i]+" ");
//        }
//        return sb.toString();
//    }
//    public JSONObject matchfunction(String code){
//        JSONObject data = null;
//        if (label.equals("Fillna")){
//            data.put("code",String.format(code,id,((JSONObject)sourceID.get(0)).getString("source"),ArraytoString(labelArray.getString("public")),attribute.getString("type")));
//        }else if (label.equals("MinMaxScaler")){
//            data.put("code",String.format(code,id,((JSONObject)sourceID.get(0)).getString("source"),ArraytoString(labelArray.getString("public"))));
//        }else if (label.equals("localFile")){
//            data.put("code",code);
//        }else if (label.equals("hdfsFile")){
//            data.put("code",String.format(code,id,fileName));
//        }else if(label.equals("LogisticRegression")){
//            data.put("code",String.format(code,id));
//        }else if(label.equals("TransformType")){
//            data.put("code",String.format(code,id,ArraytoString(labelArray.getString("public")),((JSONObject)sourceID.get(0)).getString("source"),"number"));
//        }else if(label.equals("Stringindex")){
//            data.put("code",String.format(code,id,ArraytoString(labelArray.getString("public")),((JSONObject)sourceID.get(0)).getString("source")));
//        }else if(label.equals("SortBy")){
//            data.put("code",String.format(code,id,ArraytoString(labelArray.getString("public"))));
//        }else if(label.equals("StandardScaler")){
//            data.put("code",String.format(code,id,ArraytoString(labelArray.getString("public")),((JSONObject)sourceID.get(0)).getString("source")));
//        }else if(label.equals("QuantileDiscretizer")){
//            data.put("code",String.format(code,id,ArraytoString(labelArray.getString("public")),attribute.getString("新生成列名"),((JSONObject)sourceID.get(0)).getString("source"),attribute.getString("类别数")));
//        }else if(label.equals("OneHotEncoding")) {
//            data.put("code", String.format(code, id, ArraytoString(labelArray.getString("public")), ((JSONObject)sourceID.get(0)).getString("source")));
//        }
//        return data;
//    }
//
//}
