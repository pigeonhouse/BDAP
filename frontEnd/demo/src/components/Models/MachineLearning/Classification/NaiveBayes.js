import { GaussianNB } from 'ml-naivebayes';

export function NaiveBayes(){
    var model = new GaussianNB();
    model.train(Xtrain, Ytrain);

    var predictions = model.predict(Xtest);
}