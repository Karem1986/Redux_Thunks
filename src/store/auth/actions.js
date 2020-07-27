// A thunk creator for user login 
import axios from "axios"
const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

//SIGNUP
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

//Action creator for sign up:
function signupSuccess(token) {
    return {
        type: SIGNUP_SUCCESS,
        payload: token,
    };
}

//thunk to send a request for signup to the backend:
export function signUp(name, email, password) {
    return async function (dispatch, getState) {
        console.log("Inside Thunk", email, password, name)
        try {
            const response = await axios.post(`${API_URL}/signup`,

                {
                    name: name,
                    email: email,
                    password: password

                })

            console.log('testing response', response.data.jwt)

            const token = response.data.jwt
            const action = signupSuccess(token)
            console.log('testing action token', action)
            dispatch(action);

        } catch (error) {
            console.log(error)
        }

    }
}

///Login and passed in the tunk below
function loginUser(token) { //this will actually give the login 
    return {
        type: "AUTH", //need a case in the reducer
        payload: token
    }
}

//to CREATE THE profile and send the token 
function profileUser(profile) { //this will actually give the login 
    return {
        type: "PROFILE", //needs a case in the reducer 
        payload: profile
    }
}

//Action creator for saving token to local storage:
function setItem(key, value) { //this will actually give the login 
    return {
        type: "STORING_UPDATING_TOKEN", //needs a case in the reducer 
        payload: key, value
    }
}
///THUNKS START HERE:
//auth on the client side- COPY THE WHOLE THING FOR OTHER LOGINS
export function login(email, password) {
    // this thunk dispatch the action on line 29 
    //GET THE TOKEN:
    return async function thunk(dispatch, getState) {
        // make a POST API request to `/login`
        // --to get data is axios.get--to sign up or to login is POST 
        const response = await axios.post(`${API_URL}/login`, {
            email: email,
            password: password
        })

        const token = response.data.jwt
        console.log('test token', token)
        dispatch(loginUser(token))
        console.log(
            "TODO: make login request, get an access token",
            email,
            password
        );

        //this is to save the user's profile
        const saveUserProfile = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log('testing profile', saveUserProfile.data)//works 
        dispatch(profileUser(saveUserProfile.data)) //data because that is the key we just saw in the log 

        localStorage.setItem("token", token)
    };
}

//Use the locally stored token to login- When user refresh the page it stays logged in!
//Exercise: use the locally stored token to login
export function bootstrapLoginState() {
    return async function thunk(dispatch, getState) {
        const state = getState()
        const ourSavedToken = localStorage.getItem("token")
        console.log('test token', ourSavedToken)
        //If so, makes a GET API request to /me to get the user's profile, 
        //sending along the access token.
        const getUserProfile = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${ourSavedToken}`
            }

        })
        console.log('testing getuserprofile', getUserProfile) //successful 200 OK 
        if (getUserProfile.status !== 200) {
            //remove the token if this status is not successful 
            localStorage.removeItem("token");
        }
    }

}

//LOGOUT:
export function logout(dispatch, getState) {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
}