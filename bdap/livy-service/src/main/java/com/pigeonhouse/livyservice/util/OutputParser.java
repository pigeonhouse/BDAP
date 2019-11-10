package com.pigeonhouse.livyservice.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.livyservice.entity.HeaderAttribute;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class OutputParser {
    public static String getOutput(String resultUrl) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        RestTemplate restTemplate = new RestTemplate();
        String state = "";
        String resultText = "";
        Map resultMap = null;
        while (!"available".equals(state)) {
            Thread.sleep(200);
            resultMap = objectMapper.readValue(
                    restTemplate.getForObject(resultUrl, String.class), Map.class);
            state = resultMap.get("state").toString();
        }
        LinkedHashMap outputMap = (LinkedHashMap) resultMap.get("output");
        LinkedHashMap data = (LinkedHashMap) outputMap.get("data");
        return data.get("text/plain").toString();
    }

    public static List<HeaderAttribute> parseDDL(String schemaDDL){
        ArrayList<HeaderAttribute> headerAttributes = new ArrayList<>();
        String[] ddlSplits = schemaDDL.split(",");
        for (String ddl : ddlSplits) {
            String[] nameAndType = ddl.split("`\\s");
            String name = nameAndType[0].replace("`", "");
            String typeLowerCase = nameAndType[1].toLowerCase();
            String type = typeLowerCase.substring(0, 1).toUpperCase() + typeLowerCase.substring(1);
            headerAttributes.add(new HeaderAttribute(name, type));
        }
        return headerAttributes;
    }

    /**
     * 将df.show()所展示的内容转换为csv格式（逗号分割）
     *+---+-----+---+------------------+
     * | id| name|age|         MinMaxage|
     * +---+-----+---+------------------+
     * |  1|  bob| 17|               0.0|
     * |  2| mike| 18|0.3333333333333333|
     * |  3|alice| 19|0.6666666666666666|
     * |  4|kitty| 20|               1.0|
     * +---+-----+---+------------------+
     *              ||
     *              ||
     *              \/
     *  id,name,age,MinMaxage
     *  1,bob,17,0.0
     *  2,mike,18,0.3333333333333333
     *  3,alice,19,0.6666666666666666
     *  4,kitty,20,1.0
     *
     * @param show
     * @return
     */
    public static String convertToCsv(String show){
        String[] pure = show.split("[^\\+\\|]+\\n");

        String[] splits = pure[0].split("\\\n");

        int lengthOfSplits = splits.length;

        StringBuilder csvBuilder = new StringBuilder();

        for (int row = 1; row < lengthOfSplits - 1; row++) {
            if (row == 2) {
                continue;
            }
            String[] elements = splits[row].split("\\|(\\s)*");
            int numOfCol = elements.length - 1;
            StringBuilder sb = new StringBuilder();
            for (int col = 1; col <= numOfCol; col++) {
                if (col != 1) {
                    sb.append(",");
                }
                String trimed = elements[col].trim();

                if (trimed.contains(",") || trimed.contains("\"")) {
                    trimed = trimed.replace("\"","\"\"");
                    trimed = "\"" + trimed + "\"";
                }
                sb.append(trimed);
            }
            csvBuilder.append(sb.toString()).append("\n");
        }

        return csvBuilder.toString();
    }
}
