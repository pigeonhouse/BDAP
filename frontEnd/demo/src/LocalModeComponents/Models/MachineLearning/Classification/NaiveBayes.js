import { selectData, selectDataUntransport } from '../normalFunction'
import { Stat } from '../../../DataOperate/stat'
import { Randis } from '../../../DataOperate/DataProcess/Randis'
import { GaussianNB } from "ml-naivebayes";
import ConfusionMatrix from 'ml-confusion-matrix';
function normalize(pre, predictObj, PreArray){
    let Dataset = pre;
    Dataset.push(Stat([{label:PreArray[0], value:predictObj}])[0]);
    return {Dataset:Dataset};
}
export function NaiveBayes(all_data){
    var data = JSON.parse(JSON.stringify(all_data));
    data[0]["all_attr"] = {};
    data[0].all_attr.public = 0.7;
    data[0].labelArray['public'] = [...data[0].labelArray.train_x, ...data[0].labelArray.train_y];
    console.log('data')
    console.log(data)
    const Dataset = Randis(data);
    console.log(Dataset)
    const labelArray = all_data[0].labelArray;
    const trainData = Dataset[0];
    const textData = all_data[2].Dataset;

    // const labelArray = all_data[0].labelArray;
    // const trainData = all_data[1].Dataset;
    // const textData = all_data[2].Dataset;

    const x = selectData(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.predict_x);

    const testx = selectData(Dataset[0], labelArray.train_x);
    const testy = selectDataUntransport(Dataset[0], labelArray.train_y);

    const model = new GaussianNB();
    model.train(x, y);
    var pre = model.predict(testx)

    const CM2 = ConfusionMatrix.fromLabels(testy, pre);
    console.log(CM2.getAccuracy());

    var predictObj = model.predict(predict);

    return normalize(trainData, predictObj, labelArray.predict_y)
}  
