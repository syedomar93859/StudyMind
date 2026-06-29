import {setUser, getAccountId, getUsername} from './session.js';

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const wrapper = document.querySelector(".wrapper");
const loginTitle = document.querySelector(".title-login");
const registerTitle = document.querySelector(".title-register");
const signUpBtn = document.querySelector("#signUpBtn");
const signInBtn = document.querySelector("#signInBtn");



function loginFunction(){

    // move the login form into the center
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;

    // slide the register form off-screen to the right
    registerForm.style.left = "150%";
    registerForm.style.opacity = 0;

    // resize the wrapper to fit the login form
    wrapper.style.height = "500px";

    // show the Login title
    loginTitle.style.top = "50%";
    loginTitle.style.opacity = 1;

    // hide the Register title
    registerTitle.style.top = "50px";
    registerTitle.style.opacity = 0;
}

function registerFunction(){

    // slide the login form off-screen to the left
    loginForm.style.left = "-50%";
    loginForm.style.opacity = 0;

    // move the register form into the center
    registerForm.style.left = "50%";
    registerForm.style.opacity = 1;

    // increase the wrapper height for the larger register form
    wrapper.style.height = "580px";

    // hide the Login title
    loginTitle.style.top = "-60px";
    loginTitle.style.opacity = 0;

    // show the Register title
    registerTitle.style.top = "50%";
    registerTitle.style.opacity = 1;
}

document.getElementById("signUpBtn").addEventListener("click", async function() {
  const regName = document.getElementById("reg-name").value;
  const regEmail = document.getElementById("reg-email").value;
  const regPass = document.getElementById("reg-pass").value;
  const agreed = document.getElementById("agree").checked;

  if (regName != "" && regEmail != "" && regPass != "" && agreed) {
    alert("Your username is " + regName + " and your email is " + regEmail + " and your password is " + regPass + " and you have checked the box");
    const id = await createAccount(regName, regEmail, regPass);
  }
});

document.getElementById("signInBtn").addEventListener("click", async function() {
    const logEmail = document.getElementById("log-email").value;
    const logPass = document.getElementById("log-pass").value;
    if (logEmail!= "" && logPass != "") {
        // alert("Your email is " + logEmail + " and your password is " + logPass);
        const account = await findAccount(logEmail, logPass);

        const accountId = account.id;
        const username = account.username;

        console.log(accountId);
        console.log(username);
        
        setUser(accountId, username);
        console.log(sessionStorage.getItem("accountId"));

        // setUser(account.id, account.username);

        if(account.truth){
          alert("Account exists!");
          goToHomePage();
        }else{
          alert("Account does not exist!")
        }
}
});

async function createAccount(username, email, password) {

    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username,
            email: email,
            pass: password
        })
    });

    const data = await response.json();

    return data;

}

async function findAccount(email, password) {

    const response = await fetch("/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            pass: password
        })
    });

    const data = await response.json();

    // username = data.username;
    // console.log(username);
    
    // accountId = data.id;
    // console.log(accountId);


    return data;

}

function goToHomePage() {
    location.href = './home.html'
}

document.getElementById("goToRegister").addEventListener("click", registerFunction);
document.getElementById("goToLogin").addEventListener("click", loginFunction);