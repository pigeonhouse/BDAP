import {
    STOP_LINE_CHANGE, 
    SHOW_LINE_CHANGE, 
    ConvNet, 
    DenseNet, 
    FillNa, 
    MaxMinScaler, 
    DElete, 
    UPLOAD, 
    INf } from './storeType'

const defaultState = {
    running: '',
    Dataset: [],
    picture: {}
}


export default (state = defaultState, action) => {
    const NewS = JSON.parse(JSON.stringify(state));
    const inf = NewS.picture;

    if (action.type === STOP_LINE_CHANGE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.running = 'false';
        return newState;
    }
    if (action.type === SHOW_LINE_CHANGE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.running = 'true';
        return newState;
    }
    if (action.type === ConvNet) {
        newState.Dataset.push(end_data);
        return newState;
    }


    if (action.type === DenseNet) {
        //模板
        const newState = JSON.parse(JSON.stringify(state));
        let all_data = [];
        let all_attr = [];
        for (let k = 0; k < inf.edges.length; k++){
            if(inf.edges[k].target === action.id){
                for(let p = 0; p < newState.Dataset.length; p++){
                    if(inf.edges[k].source === newState.Dataset[p].id){
                        all_data.push(newState.Dataset[p]);
                        break;
                    }
                }
            }
        }
        for(let k = 0; k < inf.nodes.length; k++){
            if(inf.nodes[k].id === action.id){
                all_attr.push(inf.nodes[k].attr);
            }
        }
        console.log(all_data)
        console.log(all_attr)
        //现在终于可以chachacha了

        let outcome = all_data[0];
        outcome.id = action.id;
        
        var isdo = [];
        for(let i = 0;i < newState.Dataset.length;i++)
            if(newState.Dataset[i].id === action.id){
                newState.Dataset[i].allData = outcome.allData;
                newState.Dataset[i].fieldNameArray = outcome.fieldNameArray;
                newState.Dataset[i].vectorLength = outcome.vectorLength;
                isdo.push(0);
            }
        if(isdo.length === 0){
            newState.Dataset.push(outcome);
        }
        return newState;
    }



    if (action.type === FillNa) {

        const newState = JSON.parse(JSON.stringify(state));
        let all_data = [];
        let all_attr = [];
        for (let k = 0; k < inf.edges.length; k++){
            if(inf.edges[k].target === action.id){
                for(let p = 0; p < newState.Dataset.length; p++){
                    if(inf.edges[k].source === newState.Dataset[p].id){
                        all_data.push(newState.Dataset[p]);
                        break;
                    }
                }
            }
        }
        for(let k = 0; k < inf.nodes.length; k++){
            if(inf.nodes[k].id === action.id){
                all_attr.push(inf.nodes[k].attr);
            }
        }
        console.log(all_data)
        console.log(all_attr)
        //现在终于可以chachacha了

        let outcome = all_data[0];
        outcome.id = action.id;

        newState.Dataset.push(outcome);
        return newState;
    }
    if (action.type === MaxMinScaler) {
        
        newState.Dataset.push(end_data);
        return newState;
    }
    if (action.type === DElete) {
        const newState = JSON.parse(JSON.stringify(state));

        for(let k = 0; k < inf.edges.length; k++){
            let _id = inf.edges[k].target;
            let ConecToOtp = 0;
            for(let p = 0; p < inf.nodes.length; p++){
                if(_id === inf.nodes[p].id && inf.nodes[p].label === 'Output'){
                    ConecToOtp = 1;
                    break;
                }
            }
            if(ConecToOtp === 0){
                for(let p = 0; p < Dataset.length;){
                    if(Dataset[p].id === _id){
                        Dataset.splice(p,1);
                    }
                    p++;
                }
            }
        }
        
        return newState;
    }
    if (action.type === UPLOAD) {
        const newState = JSON.parse(JSON.stringify(state));

        var isdo = [];
        for(let i = 0;i < newState.Dataset.length;i++)
            if(newState.Dataset[i].id === action.id){
                newState.Dataset[i].allData = action.allData;
                newState.Dataset[i].fieldNameArray = action.fieldNameArray;
                newState.Dataset[i].vectorLength = action.vectorLength;
                isdo.push(0);
            }
        if(isdo.length === 0){
            newState.Dataset.push({'id':action.id,
                        'allData':action.allData,
                        'fieldNameArray':action.fieldNameArray,
                        'vectorLength':action.vectorLength})
        }
        return newState;
    }
    if(action.type === INf){
        const newState = JSON.parse(JSON.stringify(state));
        newState.picture = action.inf;
        return newState;
    }
    return state;
}
