const initialState = {
    loading: false,
    posts: []
};

export default function feedSliceReducer(state = initialState, action) {
    switch (action.type) {
        case "feed/startLoading": {
            return {
                ...state,
                loading: true
            };
        }

        case "feed/postsFetched": {
            return {
                loading: false, //because the posts are fetched 
                posts: [...state.posts, ...action.payload]
            }
        }
        default: {
            return state;
        }
    }
}

