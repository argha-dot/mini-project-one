import Axios from "axios";

// const initial_state = {
//     user: null
// }

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
const GET_CART_ITEMS = "GET_CART_ITEMS";
const AUTH_USER = "AUTH_USER";

export default (state = [], action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.payload };

        case LOGOUT:
            return { ...state, user: null } // setting default values

        case AUTH_USER:
            return { ...state, userData: action.payload }

        case ADD_TO_CART:
            return {
                ...state, user: {
                    ...state.user,
                    cart: action.payload
                }
            }

        case GET_CART_ITEMS:
            return {
                ...state, cartDetail: action.payload
            }


        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                user: {
                    ...state.user,
                    cart: action.payload.cart
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
export function auth() {
    const request = Axios.get(`http://localhost:5000/api/users/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function addToCart(_id) {
    const request = Axios.get(`http://localhost:5000/api/users/add_to_cart?productId=${_id}`)
        .then(response => response.data)
        .catch(err => console.log("Cart Error: ", err));

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function removeCartItem(_id) {
    const request = Axios.get(`/api/users/removeFromCart?_id=${_id}`)
        .then(response => {

            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {
    const request = Axios.get(`/api/users/seeProductById?id=${cartItems}&type=array`)
        .then(response => {


            // Make CartDetail inside Redux Store 
            // We need to add quantity data to Product Information that come from Product Collection. 

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })

            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}