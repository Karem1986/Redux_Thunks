import axios from "axios";
//We're going to refactor where we store the data. 
//Instead of using component local state, we'll now store the loading and posts data in Redux.

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

//action creator to load posts 
export function startLoading() {
    return {
        type: "feed/startLoading"
    };
}

//action creator to load more posts 
export function postsFetched(morePosts) {
    return {
        type: "feed/postsFetched",
        payload: morePosts
    };
}

//Thunk function:
export async function fetchNext5Posts(dispatch, getState) {
    dispatch(startLoading());

    const offset = getState().feed.posts.length; //needs to know how many posts we have
    //with offset updating dynamically the number of posts being displayed: 
    const res = await axios.get(`${API_URL}/posts?offset=${offset}&limit=5`);

    const morePosts = res.data.rows;

    dispatch(postsFetched(morePosts));
}
//Next import this action into PostFeed.js



