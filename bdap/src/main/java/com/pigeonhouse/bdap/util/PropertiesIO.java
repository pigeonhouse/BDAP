package com.pigeonhouse.bdap.util;

import java.io.*;
import java.util.Enumeration;
import java.util.Properties;

/**
 * .properties读写
 * （未完成）
 * @author HouWeiying
 */
public class PropertiesIO {
    /**
     * 根据Key读取Value
     */
    public static String getValueByKey(String filePath, String key) throws IOException {
        Properties pps = new Properties();
        InputStream in = new BufferedInputStream(new FileInputStream(filePath));
        pps.load(in);
        String value = pps.getProperty(key);
        System.out.println(key + " = " + value);
        return value;
    }


    /**
     * 读取Properties的全部信息
     *
     * @param filePath
     * @throws IOException
     */
    public static void getAllProperties(String filePath) throws IOException {
        Properties pps = new Properties();
        InputStream in = new BufferedInputStream(new FileInputStream(filePath));
        pps.load(in);
        Enumeration en = pps.propertyNames();
        while (en.hasMoreElements()) {
            String strKey = (String) en.nextElement();
            String strValue = pps.getProperty(strKey);
            System.out.println(strKey + "=" + strValue);
        }

    }

    /**
     * 写入Properties信息
     */

    public static void writeProperties(String filePath, String pKey, String pValue) throws IOException {
        Properties pps = new Properties();
        InputStream in = new FileInputStream(filePath);
        pps.load(in);
        OutputStream out = new FileOutputStream(filePath);
        pps.setProperty(pKey, pValue);
        pps.store(out, "Update " + pKey + " name");
    }
}