import axios from "axios";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export function startLoading() {
    return {
        type: "feed/startLoading"
@@ -10, 3 + 14, 15 @@ export function postsFetched(morePosts) {
        payload: morePosts
    };
}

export async function fetchNext5Posts(dispatch, getState) {
    dispatch(startLoading());

    const offset = getState().feed.posts.length;

    const res = await axios.get(`${API_URL}/posts?offset=${offset}&limit=5`);

    const morePosts = res.data.rows;

    dispatch(postsFetched(morePosts));
}