//package com.bigdataplayground.demo.ModulesPython;
//
//import com.bigdataplayground.demo.controller.nodeCreator;
//
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
//
//public class executorPython {
//    public static void runCode(String[] arguments){
//        //String[] arguments = new String[] {"python", "src/test.py"};
//        try {
//            Process process = Runtime.getRuntime().exec(arguments);
//            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
//            String line = null;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//            in.close();
//            int re = process.waitFor();
//            System.out.println(re);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//    public void execute(nodeCreator[] nodeArray){
//        int len = nodeArray.length;
//        for (int i = 0; i < len; i++) {
//            String[] arguments = new String[]{"python","src/main/python/Fillna.py"};
//
//              runCode(arguments);
////            System.out.println(nodeArray[i].id);
////            System.out.println(nodeArray[i].label);
////            System.out.println(nodeArray[i].sourceID);
////            System.out.println(nodeArray[i].attribute);
////            System.out.println(nodeArray[i].labelArray);
//        }
//
//
//    }
//}
