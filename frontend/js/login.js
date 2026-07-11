import {setUsername} from './session.js';

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const wrapper = document.querySelector(".wrapper");
const loginTitle = document.querySelector(".title-login");
const registerTitle = document.querySelector(".title-register");
const signUpBtn = document.querySelector("#signUpBtn");
const signInBtn = document.querySelector("#signInBtn");

const customAlert = document.getElementById("customAlert");

const confirmBtn = document.getElementById("confirmBtn");


const password = document.getElementById("reg-pass");
const viewButton = document.getElementById("viewPass");
const icon = viewButton.querySelector("i");

const otherPassword = document.getElementById("log-pass");
const seeButton = document.getElementById("seePass");
const otherIcon = seeButton.querySelector("i");

async function showRequirementsMet() {
    const regPass = document.getElementById("reg-pass").value;

//   document.getElementById("fname").addEventListener("change", myFunction);


  const strongPassword = checkPassword(regPass);

  if (regPass == ""){
    document.getElementById("req-title").textContent = "";
    document.getElementById("length-req").textContent = "";
    document.getElementById("number-req").textContent = "";
    document.getElementById("letter-req").textContent = "";
    document.getElementById("rarity-req").textContent = "";

  }else if(regPass!= ""){
    document.getElementById("req-title").textContent = "Password Requirements:";
    document.getElementById("length-req").innerHTML = strongPassword.length;  
    document.getElementById("number-req").innerHTML = strongPassword.number;
    document.getElementById("letter-req").innerHTML = strongPassword.letter;
    document.getElementById("rarity-req").innerHTML = strongPassword.rarity;
    // alert(strongPassword.length + strongPassword.number + strongPassword.letter + strongPassword.rarity);
  }

    resizeWrapper(registerForm);
}


// document.getElementById("requirements-met").innerHTML = "New text!";


document.getElementById("reg-pass").addEventListener("input", showRequirementsMet);

// document.getElementById("password").addEventListener("input", someFunction);

function loginFunction(){
    clearRegisterForm();

    password.type = "password";
    if (icon.classList.contains("bx-hide")) {
        icon.classList.replace("bx-hide", "bx-show");
        viewButton.title = "Show password";
    }

    // move the login form into the center
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;

    // slide the register form off-screen to the right
    registerForm.style.left = "150%";
    registerForm.style.opacity = 0;

    // resize the wrapper to fit the login form
    // wrapper.style.height = "500px";

    // show the Login title
    loginTitle.style.top = "50%";
    loginTitle.style.opacity = 1;

    // hide the Register title
    registerTitle.style.top = "50px";
    registerTitle.style.opacity = 0;

    resizeWrapper(loginForm);
}
function clearPasswordRequirements() {
    document.getElementById("reg-pass").value = "";
    document.getElementById("req-title").textContent = "";
    document.getElementById("length-req").textContent = "";
    document.getElementById("number-req").textContent = "";
    document.getElementById("letter-req").textContent = "";
    document.getElementById("rarity-req").textContent = "";
}

function registerFunction(){

    // slide the login form off-screen to the left
    loginForm.style.left = "-50%";
    loginForm.style.opacity = 0;

    document.getElementById("log-pass").value = "";

    otherPassword.type = "password";
    if (otherIcon.classList.contains("bx-hide")) {
        otherIcon.classList.replace("bx-hide", "bx-show");
        seeButton.title = "Show password";
    }

    // move the register form into the center
    registerForm.style.left = "50%";
    registerForm.style.opacity = 1;

    // increase the wrapper height for the larger register form
    // wrapper.style.height = "580px";

    // hide the Login title
    loginTitle.style.top = "-60px";
    loginTitle.style.opacity = 0;

    // show the Register title
    registerTitle.style.top = "50%";
    registerTitle.style.opacity = 1;

    resizeWrapper(registerForm);
}




async function checkUsernameExists(username) {

    const response = await fetch("/name", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username
        })
    });

    const data = await response.json();

    return data.truth;

}

async function checkEmailExists(email) {

    const response = await fetch("/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    });

    const data = await response.json();

    return data.truth;

}


// function checkEmailExists(){
    
// }

function clearRegisterForm() {
    document.getElementById("reg-name").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-pass").value = "";
    document.getElementById("agree").checked = false;

    clearPasswordRequirements();
}

document.getElementById("signUpBtn").addEventListener("click", async function() {
  const regName = document.getElementById("reg-name").value;
  const regEmail = document.getElementById("reg-email").value;
  const regPass = document.getElementById("reg-pass").value;
  const agreed = document.getElementById("agree").checked;

  // provided by https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // provided by https://www.geeksforgeeks.org/javascript/username-validation-in-js-regex/
  const nameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

  const usernameExists = await checkUsernameExists(regName.trim());

  const emailExists = await checkEmailExists(regEmail.trim());

  const strongPassword = checkPassword(regPass);

  let errors = [];

  if (regName.trim() === "") {
    errors.push("-Username is required.");
  }else if(usernameExists){
    errors.push("-Username has already been picked.");
  }else if(!nameRegex.test(regName)){
    errors.push("-Username is invalid.");
  }
  
  if (regEmail.trim() === "") {
    errors.push("-Email is required.");
  }else if(emailExists){
    errors.push("-This email already has an account.");
  }else if(!emailRegex.test(regEmail)){
    errors.push("-Email is invalid.");
  }
  
  if (regPass === "") {
    errors.push("-Password is required.");
  }else if (!strongPassword.success) {
    errors.push("-Password does not meet all requirements.");
  }

  if (!agreed) {
    errors.push("-You must agree to the Terms & Conditions.");
  }
  
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

//   const securePass = await encryptPassword(regPass);

    
  

  try {
   const data = await createAccount(regName, regEmail, regPass);

    if (!data.success) {
        alert(data.message);
        return;
    }

    alert("Account successfully created. You can log in with this account.")
    
    loginFunction(); 

    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
  

});




loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const logEmail = document.getElementById("log-email").value;
    const logPass = document.getElementById("log-pass").value;

    const account = await findAccount(logEmail, logPass);

    if(account.truth){

        setUsername(account.username);

        // alert("Account exists.");

        goToHomePage();

    }else{

        // alert("Email or password is invalid.");
        console.log("Email or password is invalid.");

        const customAlert = document.getElementById("customAlert");
        
        customAlert.style.display = "flex";

        const closeBox = document.getElementById("closeAlert");

        const diffCloseBox = document.getElementById("confirmAlert");
        
        closeBox.addEventListener("click", () => {
            customAlert.style.display = "none";
        });

        diffCloseBox.addEventListener("click", () => {
            customAlert.style.display = "none";
        });
        

    }
});

function checkPassword(password){

    // password.value.charCodeAt(0);


    let long = true;
    let lengthMessage = "✅ Has at least 8 characters\n";

    if (password.length < 8){
        long = false;
        lengthMessage = "❌ Less than 8 characters\n";
        
    }
    // else if (){

    // }

    let hasLetter = false;
    let letterMessage = "❌ Has no letters\n";

    let hasNumber = false;
    let numberMessage = "❌ Has no numbers\n";;

    for (let i = 0; i < password.length; i++){
        const code = password.charCodeAt(i);
        
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            hasLetter = true;
            letterMessage = "✅ Has at least one letter\n";
        }
        
        if (code >= 48 && code <= 57) {
            hasNumber = true;
            numberMessage = "✅ Has at least one number\n";
        }

        if (hasLetter && hasNumber) {
            break;
        }
    }


    const weakPassword = ["password", "Password", "password1", "password123", "12345678", "123456789", "1234567890", "87654321", 
        "11111111", "00000000", "123123123", "qwerty12", "qwerty123", "qwertyui", "qwertyuiop", "asdfghjk", "zxcvbnm1", "abc12345",
        "welcome", "letmein", "football", "baseball", "superman", "dragon12", "monkey12", "sunshine", "princess", "computer", "internet", 
        "whatever", "trustno1", "master12", "freedom1", "iloveyou", "loveyou1", "charlie1", "password!", "admin123",
        "administrator", "guest123", "login123"];

    const isWeak = weakPassword.includes(password);

    let rarityMessage = "✅ Not a commonly used password\n";

    if (isWeak){
        rarityMessage = "❌ Is a common password\n";
    }

    return {
        length: lengthMessage,
        number: numberMessage,
        letter: letterMessage,
        rarity: rarityMessage,
        success: long && hasLetter && hasNumber && !isWeak,
    };

}

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
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            pass: password
        })
    });

    const data = await response.json();

    return data;

}

// async function encryptPassword(password) {

//     const response = await fetch("/hashing", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             pass: password
//         })
//     });

//     const data = await response.json();




//     return data.hash;

// }

seeButton.addEventListener("click", () => {
    if (otherPassword.type === "password") {
        otherPassword.type = "text";
        otherIcon.classList.replace("bx-show", "bx-hide");
        seeButton.title = "Hide password";
    } else {
        otherPassword.type = "password";
        otherIcon.classList.replace("bx-hide", "bx-show");
        seeButton.title = "Show password";
    }
});


viewButton.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        icon.classList.replace("bx-show", "bx-hide");
        viewButton.title = "Hide password";
    } else {
        password.type = "password";
        icon.classList.replace("bx-hide", "bx-show");
        viewButton.title = "Show password";
    }
});


function resizeWrapper(form) {
    wrapper.style.height = form.scrollHeight + 120 + "px";
}

function goToHomePage() {
    location.href = './home.html'
}

document.getElementById("goToRegister").addEventListener("click", registerFunction);
document.getElementById("goToLogin").addEventListener("click", loginFunction);

const modal = document.getElementById("modal");

document.getElementById("openBtn").addEventListener("click", () => {
    modal.classList.add("show");
});

document.getElementById("closeBtn").addEventListener("click", () => {
    modal.classList.remove("show");
});

/* close when clicking outside the modal box */
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

/* close when pressing Escape */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});



function closeModal() {
  modal.classList.remove("show");
}
