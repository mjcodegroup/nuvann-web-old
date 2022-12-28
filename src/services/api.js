import axios from 'axios'

const api = axios.create( {
    baseURL: 'https://nuvannapi.mjcodegroup.com/api/'
    //  baseURL: 'http://localhost:8000/api/'
    // headers: {
    //     "Access-Control-Allow-Origin": "http://localhost:3000",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //     'Access-Control-Allow-Credentials': 'true'
    // }
})

export default api;