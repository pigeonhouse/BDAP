package com.pigeonhouse.filesystemservice.util;

public class PathParser {
    public static String getDirPath(String path){
        String[] splits = path.split("/");
        StringBuilder dirPath = new StringBuilder();
        dirPath.append("/");
        for (int i = 1; i < splits.length - 1; i++) {
            dirPath.append(splits[i]).append("/");
        }
        return dirPath.toString();
    }
    public static String getName(String path){
        String[] splits = path.split("/");
        return splits[splits.length - 1];
    }
}
