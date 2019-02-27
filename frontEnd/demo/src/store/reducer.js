import {STOP_LINE_CHANGE, SHOW_LINE_CHANGE, ConvNet, DenseNet, FillNa, MaxMinScaler, Input, Output} from './storeType'

const defaultState = {
    running: '',
    Dataset: [{}],
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
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = 'Input';
        return newState;
    }
    if (action.type === DenseNet) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = '';
        return newState;
    }
    if (action.type === FillNa) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = '';
        return newState;
    }
    if (action.type === MaxMinScaler) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = '';
        return newState;
    }
    if (action.type === Input) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = '';
        return newState;
    }
    if (action.type === Output) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.Dataset = 'Output';
        return newState;
    }
    return state;
}
