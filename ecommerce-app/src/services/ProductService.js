import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products";

class Product {

    getProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

}

const product = new Product();

export default product;