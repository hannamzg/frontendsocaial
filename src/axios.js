import axios from "axios";

export const makeRequests =  axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true
})