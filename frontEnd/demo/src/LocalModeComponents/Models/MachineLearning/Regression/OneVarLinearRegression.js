import SimpleLinearRegression from 'ml-regression-simple-linear';
import { Stat } from '../../../DataOperate/stat'

export function OneVarLinearRegression(allData){
    console.log(allData)

    const trainFeatureName = allData[0].labelArray.train_x[0];
    const trainLabelName = allData[0].labelArray.train_y[0];
    const testFeatureName = allData[0].labelArray.predict_x[0];
    const testLabelName = allData[0].labelArray.predict_y[0];

    var trainFeatureValue = new Array();
    var trainLabelValue = new Array();
    var testFeatureValue = new Array();

    for(let i = 0; i < allData[1].Dataset.length; i++){
        if(allData[1].Dataset[i].label==trainFeatureName){
            trainFeatureValue = allData[1].Dataset[i].value
        }
        else if (allData[1].Dataset[i].label==trainLabelName){
            trainLabelValue = allData[1].Dataset[i].value
        }
    }
    for(let i = 0; i < allData[2].Dataset.length; i++){
        if(allData[2].Dataset[i].label==testFeatureName){
            testFeatureValue = allData[2].Dataset[i].value;
        }
    }

    const regression = new SimpleLinearRegression(trainFeatureValue,trainLabelValue);

    console.log(regression.score(trainFeatureValue, trainLabelValue));

    const testLabelValue = regression.predict(testFeatureValue)

    var result = regression.score(trainFeatureValue, trainLabelValue)
    const mse = result.rmsd*result.rmsd
    const rmse = result.rmsd
    const r = result.r
    const r2 = result.r2

    var resultData = {
        Dataset:[...allData[2].Dataset,
        Stat([{
            label:testLabelName,
            value:testLabelValue
        }])[0]]
    }
    resultData["evaluation"]=
    [["MSE",mse,"MSE(Mean Squared Error)均方误差: 参数估计值与参数真值之差平方的期望值,MSE可以评价数据的变化程度，MSE的值越小，说明预测模型描述实验数据具有更好的精确度。"],
    ["RMSE",rmse,"RMSE(Root Mean Squared Error)均方根误差: 均方根误差是均方误差的算术平方根"],
    ["r",r,"皮尔森相关系数(Pearson correlation coefficient): 用来反映两个变量线性相关程度,r介于-1~1之间，该值为正表示两个变量之间是正相关，值为零表示两个变量之间无相关性，值为负表示两个变量之间是负相关。"],
    ["R2",r2,"R平方: 回归平方和与总离差平方和的比值，表示总离差平方和中可以由回归平方和解释的比例，这一比例越大越好，模型越精确，回归效果越显著。R平方介于0~1之间，越接近1，回归拟合效果越好，一般认为超过0.8的模型拟合优度比较高。"]]
    return resultData;

    // const predictArray = regression.predict(DataSetTest[predictColName]); // 5

    // DataSetTest[outputColName] = predictArray;

    // regression.computeX(3.5); // 2.25
    
    // regression.toString(); // 'f(x) = 2 * x - 1'
    
    // regression.score(x, y);
    // // { r: 1, r2: 1, chi2: 0, rmsd: 0 }
    
    // const json = regression.toJSON();
    // // { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
    // const loaded = SimpleLinearRegression.load(json);
    // loaded.predict(5) // 9
}