import Axios from 'axios'

export function addToCart(productId, userId) {
    const request = Axios({
        method: "POST",
        url: `http://localhost:5000/api/cart?productId=${productId}`,
        data: {_id: userId}
    })
    .then(response => console.log("Response from add to cart: ", response))
    .catch(err => console.log("Add to Cart Error: ", err));
} 

export function deleteFromCart(productId, userId) {
    const request = Axios({
        method: "DELETE",
        url: `http://localhost:5000/api/cart?productId=${productId}`,
        data: {_id: userId}
    })
    .then(response => console.log("Response from remove from cart: ", response))
    .catch(err => console.log("Remove from Cart Error: ", err));
}

export function getCartInfo(userId) {
    const request = Axios({
        method: "GET",
        url: `http://localhost:5000/api/see_cart/id=${userId}`,
    })
    .then(response => console.log("Response from getCartInfo from cart: ", response))
    .catch(err => console.log("getCartInfo from front-end Error: ", err));
}