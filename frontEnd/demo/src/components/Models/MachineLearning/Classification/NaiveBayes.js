import { GaussianNB } from 'ml-naivebayes';

export function NaiveBayes(){

    const crossValidation = require('ml-cross-validation');

    const dataset = [[0, 1, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
    const labels = [0, 1, 0, 1, 1, 1];
    var model = new GaussianNB();
    model.train(dataset, labels);

    console.log(model)

    const confusionMatrix = crossValidation.leaveOneOut(dataset, labels, function(trainFeatures, trainLabels, testFeatures) {

        return model.predict(testFeatures);
    });
    const accuracy = confusionMatrix.getAccuracy();
    console.log(confusionMatrix)
    console.log("准确率：")
    console.log(accuracy*100+"%")

    

    
    //model.train(Xtrain, Ytrain);

    //var predictions = model.predict(Xtest);
}