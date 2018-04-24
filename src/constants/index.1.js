export const ON_CLICK = 'ON_CLICK';
export const ON_CHANGE = 'ON_CHANGE';
export const ON_BLUR_COUNTER = 'ON_BLUR_COUNTER';
export const ON_FOCUS_COUNTER = 'ON_FOCUS_COUNTER';
export const ON_DELETE_ELEM = 'ON_DELETE_ELEM';
export const SAMPLE = 'SAMPLE';
export const PERMIT = 'PERMIT';

export const GET_DATA_FIRST   = 'GET_DATA_FIRST';
export const CHANGE_VALUE_DAD = 'CHANGE_VALUE_DAD';
export const DECREASE         = 'DECREASE';

export const initialState = {
  counters: [{id:"admin",value:0,role:1}],
  isPermit:true,
  id:"",oldvalue: 0,newvalue:0,
};
