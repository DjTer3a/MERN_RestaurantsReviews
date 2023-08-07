import axios from "axios";

export default axios.create({
    baseURL: "https://mern-18xg.onrender.com/api/v1/restaurants",
    headers: {
        "Content-type": "application/json"
    }
})