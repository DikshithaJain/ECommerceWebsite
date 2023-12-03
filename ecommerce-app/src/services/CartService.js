import axios from 'axios';

const CART_API_BASE_URL = "http://localhost:8080/api/v1/cart";

class Cart {

    getCartProducts() {
        return axios.get(CART_API_BASE_URL);
    }

    addCartProduct(cartProduct) {
        return axios.post(CART_API_BASE_URL, cartProduct);
    }

    updateCartProduct(product, id) {
        return axios.put(CART_API_BASE_URL+`/${id}`, product);
    }

    deleteCartProduct(id) {
        return axios.delete(CART_API_BASE_URL+`/${id}`);
    }

}

export default (new Cart());