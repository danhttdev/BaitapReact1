import {
    GET_DATA_FIRST,
    TOGGLE_PERMIT,
    CHANGE_VALUE,
    ADD_PARENT
} from ".././constants";

export function at_getData(arr) {
    return {
        type: GET_DATA_FIRST,
        arr
    }
}
export function at_togglePermit(){
    return {
        type: TOGGLE_PERMIT,
    }
}
export function at_changeValue(id,value){
    return {
        type: CHANGE_VALUE,
        id,
        value
    }
}
export function at_addParent(arr){
    return {
        type: ADD_PARENT,
        arr
    }
}