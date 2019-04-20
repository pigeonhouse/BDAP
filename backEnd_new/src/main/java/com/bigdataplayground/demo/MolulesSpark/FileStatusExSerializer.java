package com.bigdataplayground.demo.MolulesSpark;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class FileStatusExSerializer extends StdSerializer<FileStatusEx> {
    public FileStatusExSerializer() {
        this(FileStatusEx.class);
    }

    protected FileStatusExSerializer(Class<FileStatusEx> t) {
        super(t);
    }

    @Override
    public void serialize(FileStatusEx value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();

        gen.writeStringField("path", String.valueOf(value.getPath()));
        gen.writeBooleanField("isDirectory", value.isDirectory());
        if(value.isFile()) {
            gen.writeNumberField("length", value.getLen());
            gen.writeNumberField("replication", value.getReplication());
            gen.writeNumberField("blocksize", value.getBlockSize());
        }else{
            gen.writeArrayFieldStart("subDirectory");
            for(int i = 0;i<value.getSubDirectory().size();i++) {
                gen.writeObject(value.getSubDirectory().get(i));
            }
            gen.writeEndArray();
        }
        gen.writeNumberField("modification_time", value.getModificationTime());
        gen.writeNumberField("access_time", value.getAccessTime());
        gen.writeStringField("owner", value.getOwner());
        gen.writeStringField("group", value.getGroup());
        gen.writeStringField("permission", String.valueOf(value.getPermission()));
        gen.writeBooleanField("isSymlink", value.isSymlink());
        if (value.isSymlink()) {
            gen.writeStringField("symlink", String.valueOf(value.getSymlink()));
        }

        gen.writeEndObject();

    }
}
