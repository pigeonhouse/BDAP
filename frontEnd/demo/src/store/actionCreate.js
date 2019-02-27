import {STOP_LINE_CHANGE, SHOW_LINE_CHANGE, ConvNet, DenseNet, FillNa, MaxMinScaler, DElete} from './storeType'

export const getStopLineAction = () => ({
    type: STOP_LINE_CHANGE
});
export const getShowLineAction = () => ({
    type: SHOW_LINE_CHANGE
});
export const Conv = (id) => ({
    type: ConvNet,
    id
});
export const Dens = (id) => ({
    type: DenseNet,
    id
});
export const FillN = (id) => ({
    type: FillNa,
    id
});
export const MaxM = (id) => ({
    type: MaxMinScaler,
    id
});
export const Delete = () => ({
    type: DElete
});