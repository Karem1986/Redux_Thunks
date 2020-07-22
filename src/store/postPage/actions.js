import axios from "axios";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;


//ACTION CREATORS 
export function startLoadingPost() {
    return {
        type: "postPage/startLoadingPost"
    };
}

export function postFullyFetched(data) {
    return {
        type: "postPage/postFullyFetched",
        payload: data
    };
}

//thunk to fect posts by id 
export function fetchPost(id) {
    console.log('testing', id)
    return async function thunk(dispatch, getState) {
        dispatch(startLoadingPost());
        console.log('testing loading posts', startLoadingPost())

        const [postResponse, commentsResponse] = await Promise.all([ //multile requests with Promise.all 
            axios.get(`${API_URL}/posts/${id}`), //requests posts 
            axios.get(`${API_URL}/posts/${id}/comments`) //requests comments 
        ]);

        dispatch(
            postFullyFetched({
                post: postResponse.data,
                comments: commentsResponse.data
            })
        );
    };
}
