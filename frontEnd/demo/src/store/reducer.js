import {STOP_LINE_CHANGE, SHOW_LINE_CHANGE, ConvNet, DenseNet, FillNa, MaxMinScaler, DElete} from './storeType'
import { inf } from '../components/EditorToolbar/FlowToolbar';

const defaultState = {
    running: '',
    Dataset: [{'id':111, 'data':[1,2,3]}]
}

export default (state = defaultState, action) => {
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

        return newState;
    }
    if (action.type === DenseNet) {
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

        return newState;
    }
    if (action.type === FillNa) {
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

        return newState;
    }
    if (action.type === MaxMinScaler) {
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
                //Dataset.length是即时变更的吗？是的话就好了
                for(let p = 0; p < Dataset.length; p++){
                    if(Dataset[p].id === _id){
                        Dataset.splice(p,1);
                    }
                }
            }
        }
        
        return newState;
    }
}
