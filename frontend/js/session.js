// this stores the logged-in user's username in sessionStorage
// this allows the username to persist while the browser tab remains open
export function setUsername(name){
    sessionStorage.setItem("username", name);
}


// gets the username from sessionStorage
// returns an empty string if no username has been stored yet.
export function getUsername(){

    if (sessionStorage.getItem("username") === null || sessionStorage.getItem("username") === undefined) {
        return "";
    } else {
        return sessionStorage.getItem("username");
    }
}


// attempts to restore the user's login session by asking the backend for the currently authenticated account
// if successful, the username is stored in sessionStorage so other pages can access it
export async function restoreSession() {

    // this requests information about the currently logged-in user
    // "same-origin" ensures the browser sends the session cookie
    const response = await fetch("/me", {
        credentials: "same-origin"
    });

    // if the server returns 401 or any other error, there is no valid authenticated session
    if (!response.ok)
        return false;

    // read the account information returned by the server
    const data = await response.json();

    // save the username locally for the frontend to use
    setUsername(data.username);

    // indicate that session restoration was successful.
    return true;
}