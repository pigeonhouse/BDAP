<<<<<<< HEAD
import {STOP_LINE_CHANGE, SHOW_LINE_CHANGE, ConvNet, DenseNet, FillNa, MaxMinScaler, DElete, UPLOAD, INf} from './storeType'
=======
import {STOP_LINE_CHANGE, SHOW_LINE_CHANGE, ConvNet, DenseNet, FillNa, MaxMinScaler, DElete} from './storeType'
>>>>>>> e559b7762cd0c3568be4fb25804cd25fc97ca81a

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
<<<<<<< HEAD
        newState.Dataset.push(end_data);
=======
        //多个数据源的话，函数怎么处理? 是一次一次？ 还是把数据组合一起输入？ 都可以
        const newState = JSON.parse(JSON.stringify(state));
        let all_data = [];
        console.log(inf);
        for (let k = 0; k < inf.edges.length; k++){
            if(inf.edges[k].target === action.id){
                for(let p = 0; p < Dataset.length; p++){
                    if(inf.edges[k].source === Dataset[p].id){
                        all_data.push({'id':action.id,'data':Dataset[p].data});//代表这个id的框，和输入这个框的所有data的集合
                        //处理的时候按需求，如果一次一次输入，就按这个组合，一次次输入data
                        //如果一下子全输入，我们就把所有的data部分push进一个新数组再输入；
                        break;
                    }
                }
            }
        }
        //在这里做你想做的事

        //处理data的过程接入处理函数，输入函数为来的all_data
        //接你的函数吧；



        let processed_data = [];    //假设这是处理后的输出结果;
        let end_data = {'id':action.id,'data':processed_data};    //处理完了all_data，再把数据存入redux;
        newState.Dataset.push(end_data);        //okk

>>>>>>> e559b7762cd0c3568be4fb25804cd25fc97ca81a
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

        //现在终于可以chachacha了

        let outcome = [];

        newState.Dataset.push(outcome);
        return newState;
    }






    if (action.type === FillNa) {
        newState.Dataset.push(end_data);
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
        newState.Dataset.push({'id':action.id,
                        'allData':action.allData,
                        'fieldNameArray':action.fieldNameArray,
                        'vectorLength':action.vectorLength})
        return newState;
    }
    if(action.type === INf){
        const newState = JSON.parse(JSON.stringify(state));
        newState.picture = action.inf;
        return newState;
    }

    return state;
}
