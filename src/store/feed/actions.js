import axios from "axios";
//We're going to refactor where we store the data. 
//Instead of using component local state, we'll now store the loading and posts data in Redux.

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;


export function startLoading() {
    return {
        type: "feed/startLoading"
    };
}
export function postsFetched(morePosts) {
    return {
        type: "feed/postsFetched",
        payload: morePosts
    };
}

//Thunk function:
export async function fetchNext5Posts(dispatch, getState) {
    dispatch(startLoading());

    const offset = getState().feed.posts.length;
    //with offset updating dynamically the number of posts being displayed: 
    const res = await axios.get(`${API_URL}/posts?offset=${offset}&limit=5`);

    const morePosts = res.data.rows;

    dispatch(postsFetched(morePosts));
}
//Next import this action into PostFeed.js



