export const initialState = {
  counters: [{id:"admin",value:0,role:1}],
  isPermit:true,
  id:"",oldvalue: 0,newvalue:0,
};

export const KEY_PARENT_INCREASE = 'PARENT_INCREASE';
export const KEY_PARENT_DECREASE = 'PARENT_DECREASE';
export const KEY_UPDATE_CHILD    = 'UPDATE_CHILD';



export const HOST = "http://localhost/counter_redux_2.php";
export const GET_DATA_FIRST = 'GET_DATA_FIRST';
export const TOGGLE_PERMIT = 'TOGGLE_PERMIT';
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const ADD_PARENT = 'ADD_PARENT';