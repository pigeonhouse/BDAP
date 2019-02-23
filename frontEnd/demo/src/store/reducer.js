import { STOP_LINE_CHANGE, SHOW_LINE_CHANGE } from './storeType'
const defaultState = {
    running: ''
}

export default (state = defaultState, action)=>{
    if(action.type === STOP_LINE_CHANGE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.running = 'false';
        return newState;
    }
    if(action.type === SHOW_LINE_CHANGE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.running = 'true';
        return newState;
    }
    return state;
}