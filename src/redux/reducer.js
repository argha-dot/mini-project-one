import Axios from "axios";

const initial_state = {
    user: null 
}

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADD_TO_CART = "ADD_TO_CART";

export default (state = initial_state, action) => {
    switch(action.type) {
        case LOGIN: 
        return {...state, user: action.payload};

        case LOGOUT: 
        return {...state, user: null} // setting default values

        case ADD_TO_CART: 
        return {
            ...state, user: { 
                ...state.user,
                cart: action.payload
            }
        }

        default:
        return state;
    }
}

export const login = (user_info) => {
    return {
        type: LOGIN, 
        payload: user_info
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export function addToCart(_id) {
    const request = Axios.get(`api/user-data/addToCart?productId=${_id}`)
        .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}