// A thunk creator for user login 

import { Route } from "react-router-dom";
import axios from "axios"
const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

function loginUser(token) {
    return {
        type: "AUTH",
        payload: token
    }
}

//auth on the client side 
export function login(email, password) {
    // Return the thunk itself, i.e. a function
    return async function thunk(dispatch, getState) {
        // TODO:
        // make a POST API request to `/login`
        // --to get data is axios.get--to sign up or to login is POST 
        const response = await axios.post(`${API_URL}/login`, {
            email: email,
            password: password
        })

        const token = response.data.jwt
        console.log(
            "TODO: make login request, get an access token",
            email,
            password,
            token
        );
    };
}

