//if the user is logged in we want to show the user's name 
//so we need a selector to acces the state 
//we want the token and the name:

export function getToken(reduxState) {
    return reduxState.auth.token
}

export function getName(reduxState) {
    return reduxState.auth.name
}