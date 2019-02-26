import {STOP_LINE_CHANGE, SHOW_LINE_CHANGE, ConvNet, DenseNet, FillNa, MaxMinScaler, Input, Output} from './storeType'

export const getStopLineAction = () => ({
    type: STOP_LINE_CHANGE
});
export const getShowLineAction = () => ({
    type: SHOW_LINE_CHANGE
});
export const Conv = (Dataset) => ({
    type: ConvNet,
    Dataset
});
export const Dens = (Dataset) => ({
    type: DenseNet,
    Dataset
});
export const FillN = (Dataset) => ({
    type: FillNa,
    Dataset
});
export const MaxM = (Dataset) => ({
    type: MaxMinScaler,
    Dataset
});
export const Inp = (Dataset) => ({
    type: Input,
    Dataset
});
export const Outp = (Dataset) => ({
    type: Output,
    Dataset
});
