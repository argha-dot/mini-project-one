const initial_state = {
    user: null 
}

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export default (state = initial_state, action) => {
    switch(action.type) {
        case LOGIN: 
        return {...state, user: action.payload};

        case LOGOUT: 
        return {...state, user: null} // setting default values

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