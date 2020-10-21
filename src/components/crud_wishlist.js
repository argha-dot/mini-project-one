import Axios from 'axios'
export default function Wishlist(type, userId, productId) {
    console.log("Hello from Wishlist CRUD")
    switch (type) {
        case 'ADD_TO_WISHLIST':
            Axios({
                method: "POST",
                url: `http://localhost:5000/api/wishlist?productId=${productId}`,
                data: { _id: userId }
            })
                .then(response => console.log("Response from add to wishlist: ", response))
                .catch(err => console.log("Add to wishlist Error: ", err));

        break;

        case 'DELETE_FROM_WISHLIST':
            Axios({
                method: "DELETE",
                url: `http://localhost:5000/api/wishlist?productId=${productId}`,
                data: { _id: userId }
            })
                .then(response => console.log("Response from remove from wishlist: ", response))
                .catch(err => console.log("Remove from wishlist Error: ", err));

        break;

        case 'GET_WISHLIST_INFO':
            console.log("User from wish: ", userId);
            Axios({
                method: "GET",
                url: `http://localhost:5000/api/see_wishlist/${userId}`,
            })
                .then(response => {
                    console.log("Response from getWishlistInfo: ", response)
                    return response; 
                })
                .catch(err => console.log("getWishlistInfo from front-end Error: ", err));

        break;
    }
}