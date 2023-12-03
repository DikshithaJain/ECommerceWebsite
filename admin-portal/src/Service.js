import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

class User {

    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    deleteUser(id) {
        return axios.delete(USER_API_BASE_URL+`/${id}`);
    }

}

export default new User();