package com.bigdataplayground.demo.MolulesSpark;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.permission.FsPermission;

import java.io.IOException;
import java.util.List;

@JsonSerialize(using = FileStatusExSerializer.class)

public class FileStatusEx {
    @JsonProperty("path")
    private Path path;
    @JsonProperty("length")
    private long length;
    @JsonProperty("isDirectory")
    private boolean isdir;
    @JsonProperty("subDirectory")
    private List<FileStatusEx> subDirectory;
    @JsonProperty("replication")
    private short block_replication;
    @JsonProperty("blocksize")
    private long blocksize;
    @JsonProperty("modification_time")
    private long modification_time;
    @JsonProperty("access_time")
    private long access_time;
    @JsonProperty("permission")
    private FsPermission permission;
    @JsonProperty("owner")
    private String owner;
    @JsonProperty("group")
    private String group;
    @JsonProperty("symlink")
    private Path symlink;

    public FileStatusEx(FileStatus fileStatus) throws IOException {
        path = fileStatus.getPath();
        length = fileStatus.getLen();
        isdir = fileStatus.isDirectory();
        subDirectory = null;
        block_replication = fileStatus.getReplication();
        blocksize = fileStatus.getBlockSize();
        modification_time = fileStatus.getModificationTime();
        access_time = fileStatus.getAccessTime();
        permission = fileStatus.getPermission();
        owner = fileStatus.getOwner();
        group = fileStatus.getGroup();
        symlink = fileStatus.isSymlink() ? fileStatus.getSymlink() : null;
    }

    public List<FileStatusEx> getSubDirectory() {
        return subDirectory;
    }

    public void setSubDirectory(List<FileStatusEx> subDirectory) {
        this.subDirectory = subDirectory;
    }

    public long getLen() {
        return this.length;
    }

    public boolean isFile() {
        return !this.isdir && !this.isSymlink();
    }

    public boolean isDirectory() {
        return this.isdir;
    }

    /** @deprecated */
    @Deprecated
    public boolean isDir() {
        return this.isdir;
    }

    public boolean isSymlink() {
        return this.symlink != null;
    }

    public long getBlockSize() {
        return this.blocksize;
    }

    public short getReplication() {
        return this.block_replication;
    }

    public long getModificationTime() {
        return this.modification_time;
    }

    public long getAccessTime() {
        return this.access_time;
    }

    public FsPermission getPermission() {
        return this.permission;
    }

    public boolean isEncrypted() {
        return this.permission.getEncryptedBit();
    }

    public String getOwner() {
        return this.owner;
    }

    public String getGroup() {
        return this.group;
    }

    public Path getPath() {
        return this.path;
    }

    public void setPath(Path p) {
        this.path = p;
    }

    protected void setPermission(FsPermission permission) {
        this.permission = permission == null ? FsPermission.getFileDefault() : permission;
    }

    protected void setOwner(String owner) {
        this.owner = owner == null ? "" : owner;
    }

    protected void setGroup(String group) {
        this.group = group == null ? "" : group;
    }

    public Path getSymlink() throws IOException {
        if (!this.isSymlink()) {
            throw new IOException("Path " + this.path + " is not a symbolic link");
        } else {
            return this.symlink;
        }
    }

    public void setSymlink(Path p) {
        this.symlink = p;
    }

}
