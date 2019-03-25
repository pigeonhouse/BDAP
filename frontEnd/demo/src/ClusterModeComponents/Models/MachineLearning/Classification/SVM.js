import {selectData, selectDataUntransport, transposition} from '../normalFunction'

function normalize(predict, labelArray, predictObj, PreArray){
    const pre = transposition(predict);
    let Dataset = [];
    for(let i in labelArray){
        Dataset.push({label:labelArray[i], value:pre[i]})
    }
    Dataset.push({label:PreArray[0], value:predictObj})
    return {Dataset:Dataset};
}
export function SVM(all_data){
    var SVM = require('ml-svm');
    
    const labelArray = all_data[0].labelArray;
    const trainData = all_data[1].Dataset;
    const textData = all_data[2].Dataset;
    const attr = all_data[0].all_attr;

    const features = selectData(trainData, labelArray.train_x);
    const labels = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.text_x);

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
    // console.log(features)
    // console.log(labels)
    // console.log(options)

    svm.train(features, labels);
    var predictObj = svm.predict(predict);
    // console.log(predict)
    // console.log(predictObj)

    return normalize(predict, labelArray.text_x, predictObj, labelArray.text_y)

    // Let's see how narrow the margin is
    // var margins = svm.margin(features);

    // I want to see what my support vectors are
    // var supportVectors = svm.supportVectors();
    
    // Now we want to save the model for later use
    // var model = svm.toJSON();

    /// ... later, you can make predictions without retraining the model
    // var importedSvm = SVM.load(model);
    // importedSvm.predict(features); // [1, -1, 1, -1] 
}