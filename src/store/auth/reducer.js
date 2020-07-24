const initialState = {
    me: null, // the logged-in user
    token: null
};

//create the reducer-store the data to the reducer 
export default function authSliceReducer(state = initialState, action) {
    switch (action.type) {
        case "AUTH": { //THE cases match with the action type functions in actions.js
            return {
                ...state,
                token: action.payload
            };
        }
        case "PROFILE": {
            return {
                ...state,
                ...action.payload //we want to know the profile after user logs in
            };
        }

        case "STORING_UPDATING_TOKEN": {
            return {
                ...state,
                ...action.payload //the user stays logged in after refeshing the page
            };
        }

        //Logout
        case "LOGOUT": {
            return initialState //REverts to initialState //it logouts the user 

        }
        default: {
            return state;
        }
    }
}//TEST IT on redux: log in and look at the redux DIff tab and state tab, data is there everthing works 
