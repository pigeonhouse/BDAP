import { DecisionTreeRegression as DTRegression } from 'ml-cart';

export function DecisionTreeRegression(){
    var x = new Array(100);
    var y = new Array(100);
    var val = 0.0;
    for (var i = 0; i < x.length; ++i) {
        x[i] = val;
        y[i] = Math.sin(x[i]);
        val += 0.01;
        }

    var reg = new DTRegression();
    reg.train(x, y);
    var estimations = reg.predict(x);
    console.log(reg)
    console.log(estimations)
    
}