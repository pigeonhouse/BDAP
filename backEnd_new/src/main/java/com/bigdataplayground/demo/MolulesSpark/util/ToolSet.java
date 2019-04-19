package com.bigdataplayground.demo.MolulesSpark.util;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.Future;

public class ToolSet {
    /**
     * 异步的文件读写模板，利用了Channel和future，直接调用还是相当于阻塞（就是还没啥用）
     * @param path
     * @return
     * @throws IOException
     */
    public static String openFile(Path path) throws IOException {

        AsynchronousFileChannel channel = null;

        channel = AsynchronousFileChannel.open(path);
        ByteBuffer byteBuffer = ByteBuffer.allocate(4096);//声明4096个字节的buffer
        Future future = channel.read(byteBuffer, 0);
        //这里不会阻塞
        System.out.print("文件读取中...");
        while (!future.isDone()) {
            System.out.print('.');
        }
        System.out.println("文件读取完成");
        byteBuffer.flip();
        //打印bytebuff中的内容
        String codeString = Charset.forName("utf-8").decode(byteBuffer).toString();

        channel.close();

        return codeString;
    }

    /**
     * 将[item1,item2]转化为"item1 item2"
     * @param list
     * @return
     */
    public static String listToString(List<String> list){
        String string = new String();
        for(int i = 0 ;i<list.size();i++){
            if(i ==list.size()-1){
                string = string + list.get(i);
            }else{
                string = string + " ";
            }
        }
        return string;
    }

}
