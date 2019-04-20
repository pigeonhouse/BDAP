import {
    STOP_LINE_CHANGE, 
    SHOW_LINE_CHANGE, MODEL } from './storeType'
const defaultState = {
    Dataset: [],
    did:true,
    name:"模型1号",
    info:"这是我的第1个模型",
    count:1,
}
export default (state = defaultState, action) => {
    if(action.type === MODEL){
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = action.value;
        newState.did = action.did;
        newState.name = action.name;
        newState.info = action.info;
        return newState;
    }
    if(action.type === 'test'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.did = action.did;
        newState.count = action.count;
        console.log("-----------")
        console.log(newState)
        return newState;
    }
    return state;
}
