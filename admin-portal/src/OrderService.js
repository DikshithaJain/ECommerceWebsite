import axios from 'axios';

const ORDER_API_BASE_URL = "http://localhost:8080/api/v1/orders";

class Order {

    getOrders() {
        return axios.get(ORDER_API_BASE_URL);
    }

    addOrder(order) {
        return axios.post(ORDER_API_BASE_URL, order);
    }

    // updateCartProduct(product, id) {
    //     return axios.put(CART_API_BASE_URL+`/${id}`, product);
    // }

    // deleteCartProduct(id) {
    //     return axios.delete(CART_API_BASE_URL+`/${id}`);
    // }

}

export default (new Order());