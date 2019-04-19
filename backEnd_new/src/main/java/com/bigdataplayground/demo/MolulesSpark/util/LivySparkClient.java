//package com.bigdataplayground.demo.MolulesSpark.util;
//
//import org.apache.livy.LivyClient;
//import org.apache.livy.LivyClientBuilder;
//
//import java.io.IOException;
//import java.net.URI;
//import java.net.URISyntaxException;
//import java.util.Properties;
//
//public class LivySparkClient {
//    public LivySparkClient(String livyAddr) throws URISyntaxException, IOException {
//        Properties properties = new Properties().setProperty("kind",2);
//        LivyClient client = new LivyClientBuilder()
//                .setURI(new URI(livyAddr))
//                .build();
//    }
//}
