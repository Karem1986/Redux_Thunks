// src/store/postPage/selectors.js
//Write a selector selectPostAndComments that:

// returns an object of the shape { post, comments } if the post is done loading,
// returns null if the post is still loading:

export function selectPostAndComments(reduxState) {
    return reduxState.postPage.loading
        ? null
        : {
            post: reduxState.postPage.post,
            comments: reduxState.postPage.comments
        };
}