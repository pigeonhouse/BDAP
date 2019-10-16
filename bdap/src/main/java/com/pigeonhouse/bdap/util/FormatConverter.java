package com.pigeonhouse.bdap.util;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/6 22:01
 */
public class FormatConverter {

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
        System.out.println("-------show---------");
        System.out.println(show);

        String[] pure = show.split("[^\\+\\|]+\\n");

//        System.out.println("------pure[0]--------");
//        System.out.println(pure[0]);
//        System.out.println("------pure[1]-------");
//        System.out.println(pure[1]);
//        System.out.println("------pure[2]-------");
//        System.out.println(pure[2]);

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
                sb.append(elements[col]);
                System.out.println(elements[col]);
            }
            csvBuilder.append(sb.toString()).append("\n");
        }
        System.out.println("csvBuilder.toString()");
        System.out.println(csvBuilder.toString());
        return csvBuilder.toString();
    }
}
