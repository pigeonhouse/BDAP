package com.bigdataplayground.demo.molules.spark.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.hadoop.fs.FileStatus;

import java.io.IOException;
import java.util.List;

@JsonSerialize(using = FileStatusExSerializer.class)
public class FileStatusEx extends FileStatus{
    private List<FileStatusEx> subDirectory;

    public FileStatusEx(FileStatus fileStatus) throws IOException {
        super(fileStatus);
        subDirectory = null;
    }

    public List<FileStatusEx> getSubDirectory() {
        return subDirectory;
    }

    public void setSubDirectory(List<FileStatusEx> subDirectory) {
        this.subDirectory = subDirectory;
    }

}
