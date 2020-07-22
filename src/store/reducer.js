// src/store/reducer.js
import { combineReducers } from "redux";
import feedSliceReducer from "./feed/reducer";
import postPageSliceReducer from "./postPage/reducer";

const reducer = combineReducers({
    // someFeature: someFeatureReducer
    // etc.
    feed: feedSliceReducer,
    postPage: postPageSliceReducer
});

export default reducer;