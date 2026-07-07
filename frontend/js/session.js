// let accountId = null;

let username = null;

export function setUsername(name){
    sessionStorage.setItem("username", name);
}

// export function getAccountId(){
//     return Number(sessionStorage.getItem("accountId"));
// }

export function getUsername(){
    if (sessionStorage.getItem("username") === null || sessionStorage.getItem("username") === undefined) {
        return "";
    } else {
        return sessionStorage.getItem("username");
    }
}