import {
    STOP_LINE_CHANGE, 
    SHOW_LINE_CHANGE, MODEL } from './storeType'
const defaultState = {
    Dataset: [],
    did:false
}
export default (state = defaultState, action) => {
    if(action.type === MODEL){
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = action.value;
        newState.did = action.did;
        return newState;
    }
    if(action.type === 'test'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.did = action.did;
        return newState;
    }
    return state;
}
