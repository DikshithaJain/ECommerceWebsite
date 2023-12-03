import axios from 'axios';

const SELLER_API_BASE_URL = "http://localhost:8080/api/v1/sellers";

class Seller {

    createSeller(seller) {
        return axios.post(SELLER_API_BASE_URL, seller);
    }

    getSellers() {
        return axios.get(SELLER_API_BASE_URL);
    }

}

export default new Seller();