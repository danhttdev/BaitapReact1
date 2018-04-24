import {
    initialState,
    GET_DATA_FIRST,
    TOGGLE_PERMIT,
    CHANGE_VALUE,
    ADD_PARENT
} from "../constants";

export function reducer(state = initialState, action) {
    switch (action.type) { 
        case GET_DATA_FIRST:
            return {
                ...state,
                counters: action.arr
            } 
        case TOGGLE_PERMIT:
            return {
                ...state,
                isPermit: !state.isPermit
            }
        case CHANGE_VALUE:
            const arr = state.counters.map((item) => {
                if (item.id === action.id) item.value = action.value;
                return item;
            })
            return {
                ...state,
                counters: [...arr]
            }
        case ADD_PARENT:
            return {
                ...state,
                counters: [...state.counters.concat(action.arr)]
            }
        default:
        return state;
    }
}
