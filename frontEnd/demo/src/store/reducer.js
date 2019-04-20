import {
    STOP_LINE_CHANGE, 
    SHOW_LINE_CHANGE, MODEL } from './storeType'
const defaultState = {
    Dataset: [],
    did:false,
    name:"模型",
    info:"这是我的模型",
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
        return newState;
    }
    return state;
}
