import PolynomialRegression from 'ml-regression-polynomial';
import {selectDataUntransport} from '../ToolFunctions//ToolFunctions'
import { Stat } from '../../../../PublicComponents/DataOperate/DataToolFunctions/Stat'
function normalize(pre, Obj, objArray){
    let Dataset = pre;
    
    Dataset.push(Stat([{label:objArray[0], value:Obj}])[0]);
    return {Dataset:Dataset};
}
export function OneVarPolynomialRegression(all_data){
    const labelArray = all_data[0].labelArray;
    var trainData = all_data[1].Dataset;
    var textData = all_data[2].Dataset;

    const x = selectDataUntransport(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectDataUntransport(textData, labelArray.predict_x);
    const degree = all_data[0].all_attr['多项式最高幂'];
    const regression = new PolynomialRegression(x, y, degree);
    const predictObj = regression.predict(predict);
    const result = regression.score(x, y);
    console.log(result);

    var resultData = normalize(textData, predictObj, labelArray.predict_y);
    const mse = result.rmsd*result.rmsd
    const rmse = result.rmsd
    const r = result.r
    const r2 = result.r2
    resultData["evaluation"]=
    [["MSE",mse.toFixed(4),"MSE(Mean Squared Error)均方误差: 参数估计值与参数真值之差平方的期望值,MSE可以评价数据的变化程度，MSE的值越小，说明预测模型描述实验数据具有更好的精确度。"],
    ["RMSE",rmse.toFixed(4),"RMSE(Root Mean Squared Error)均方根误差: 均方根误差是均方误差的算术平方根"],
    ["r",r.toFixed(4),"皮尔森相关系数(Pearson correlation coefficient): 用来反映两个变量线性相关程度,r介于-1~1之间，该值为正表示两个变量之间是正相关，值为零表示两个变量之间无相关性，值为负表示两个变量之间是负相关。"],
    ["R2",r2.toFixed(4),"R平方: 回归平方和与总离差平方和的比值，表示总离差平方和中可以由回归平方和解释的比例，这一比例越大越好，模型越精确，回归效果越显著。R平方介于0~1之间，越接近1，回归拟合效果越好，一般认为超过0.8的模型拟合优度比较高。"]]

    return resultData;
}
    // const x = [50, 50, 50, 70, 70, 70, 80, 80, 80, 90, 90, 90, 100, 100, 100];
    // const y = [3.3, 2.8, 2.9, 2.3, 2.6, 2.1, 2.5, 2.9, 2.4, 3.0, 3.1, 2.8, 3.3, 3.5, 3.0]

    // console.log(regression.predict(80)); // Apply the model to some x value. Prints 2.6.
    // console.log(regression.coefficients); // Prints the coefficients in increasing order of power (from 0 to degree).
    // console.log(regression.toString(3)); // Prints a human-readable version of the function.
    // console.log(regression.toLaTeX());
    // console.log(regression.score(x, y));