package com.pigeonhouse.filesystemservice.util;

public class PathParser {
    public static String getDirPath(String path){
        String[] splits = path.split("/");
        StringBuilder dirPath = new StringBuilder();
        for (int i = 0; i < splits.length - 1; i++) {
            dirPath.append("/").append(splits[i]);
        }
        return dirPath.toString();
    }
    public static String getName(String path){
        String[] splits = path.split("/");
        return splits[splits.length - 1];
    }
}
