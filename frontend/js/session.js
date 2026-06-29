let accountId = null;

let username = null;

export function setUser(id,name){
    sessionStorage.setItem("accountId", id);
    sessionStorage.setItem("username", name);
}

export function getAccountId(){
    return Number(sessionStorage.getItem("accountId"));
}

export function getUsername(){
    return sessionStorage.getItem("username");
}