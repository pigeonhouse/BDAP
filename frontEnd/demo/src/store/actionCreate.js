import { STOP_LINE_CHANGE, SHOW_LINE_CHANGE } from './storeType'
export const getStopLineAction = ()=>({
    type: STOP_LINE_CHANGE
});
export const getShowLineAction = ()=>({
    type: SHOW_LINE_CHANGE
});