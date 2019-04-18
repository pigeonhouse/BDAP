import {selectData, selectDataUntransport} from '../normalFunction'
import { Stat } from '../../../../PublicComponents/DataOperate/stat'
import { Randis } from '../../../../PublicComponents/DataOperate/DataProcess/Randis'
import ConfusionMatrix from 'ml-confusion-matrix';

function normalize(pre, predictObj, PreArray){
    let Dataset = pre;
    Dataset.push(Stat([{label:PreArray[0], value:predictObj}])[0]);
    return {Dataset:Dataset};
}
export function SVM(all_data){
    var SVM = require('ml-svm');
    
    var data = JSON.parse(JSON.stringify(all_data));
    data[0]["all_attr"] = {};
    data[0].all_attr.public = 0.7;
    const Dataset = Randis(data).Dataset;

    const labelArray = all_data[0].labelArray;
    const trainData = Dataset[0];
    const textData = all_data[2].Dataset;
    const attr = all_data[0].all_attr;

    const features = selectData(trainData, labelArray.train_x);
    const labels = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.predict_x);

    var options = {
        C: attr.C,
        tol: attr.tol,
        maxPasses: attr.maxPasses,
        maxIterations: attr.maxIterations,
        kernel: attr.kernel,
        kernelOptions: {
            sigma: attr.kernelOptionsSigma
        }
    };

    var svm = new SVM(options);
    svm.train(features, labels);
    console.log('attr')
    console.log(features)
    console.log(labels)
    console.log(options)

    const testx = selectData(Dataset[1], labelArray.train_x);
    const testy = selectDataUntransport(Dataset[1], labelArray.train_y);

    var pre = svm.predict(testx)
    console.log('pre')

    console.log(pre)
    const CM2 = ConfusionMatrix.fromLabels(testy, pre);
    var predictObj = svm.predict(predict);

    var resultData = normalize(textData, predictObj, labelArray.predict_y);
    resultData["evaluation"]=[["Precision",CM2.getAccuracy(),"正确率"]];
    return resultData;
}