import axios from 'axios';

const CATEGORY_API_BASE_URL = "http://localhost:8080/api/v1/categories";

class Category {

    getCategories() {
        return axios.get(CATEGORY_API_BASE_URL);
    }

    addCategory(category) {
        return axios.post(CATEGORY_API_BASE_URL, category);
    }

}
const category = new Category();
export default category;