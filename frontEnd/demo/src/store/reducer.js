import {
    STOP_LINE_CHANGE, 
    SHOW_LINE_CHANGE, MODEL } from './storeType'
const defaultState = {
    running: '',
    Dataset: [],
}
export default (state = defaultState, action) => {
    if(action.type === MODEL){
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = action.value;
        return newState;
    }
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
    return state;
}
