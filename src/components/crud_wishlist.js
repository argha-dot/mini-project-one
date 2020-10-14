import Axios from 'axios'

export function addToWishlist(productId, userId) {
    const request = Axios({
        method: "POST",
        url: `http://localhost:5000/api/wishlist?productId=${productId}`,
        data: {_id: userId}
    })
    .then(response => console.log("Response from add to wishlist: ", response))
    .catch(err => console.log("Add to wishlist Error: ", err));
} 

export function deleteFromWishlist(productId, userId) {
    const request = Axios({
        method: "DELETE",
        url: `http://localhost:5000/api/wishlist?productId=${productId}`,
        data: {_id: userId}
    })
    .then(response => console.log("Response from remove from wishlist: ", response))
    .catch(err => console.log("Remove from wishlist Error: ", err));
}

export function getWishlistInfo(userId) {
    const request = Axios({
        method: "GET",
        url: `http://localhost:5000/api/see_wishlist/id=${userId}`,
    })
    .then(response => console.log("Response from getWishlistInfo: ", response))
    .catch(err => console.log("getWishlistInfo from front-end Error: ", err));
}