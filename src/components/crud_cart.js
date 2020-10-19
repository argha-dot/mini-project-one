import Axios from 'axios'

export default function Cart(type, userId, productId) {
    console.log("Hello from ADD CRUD")
    switch (type){ 
        case 'ADD_TO_CART': 
                console.log("Hello from ADD Cart")
                const request = Axios({
                method: "POST",
                url: `http://localhost:5000/api/cart?productId=${productId}`,
                data: { _id: userId }
            })
                .then(response => console.log("Response from add to cart: ", response))
                .catch(err => console.log("Add to Cart Error: ", err))

        case 'DELETE_FROM_CART':
                request = Axios({
                    method: "DELETE",
                    url: `http://localhost:5000/api/cart?productId=${productId}`,
                    data: { _id: userId }
                })
                .then(response => console.log("Response from remove from cart: ", response))
                .catch(err => console.log("Remove from Cart Error: ", err))
    

        case 'GET_CART_INFO': 
            request = Axios({
                method: "GET",
                url: `http://localhost:5000/api/see_cart/id=${userId}`,
            })
            .then(response => console.log("Response from getCartInfo from cart: ", response))
            .catch(err => console.log("getCartInfo from front-end Error: ", err))
    }



    // function deleteFromCart(productId, userId) {
    //     const request = Axios({
    //         method: "DELETE",
    //         url: `http://localhost:5000/api/cart?productId=${productId}`,
    //         data: { _id: userId }
    //     })
    //         .then(response => console.log("Response from remove from cart: ", response))
    //         .catch(err => console.log("Remove from Cart Error: ", err));
    // }

    // function getCartInfo(userId) {
    //     const request = Axios({
    //         method: "GET",
    //         url: `http://localhost:5000/api/see_cart/id=${userId}`,
    //     })
    //         .then(response => console.log("Response from getCartInfo from cart: ", response))
    //         .catch(err => console.log("getCartInfo from front-end Error: ", err));
    // }
}