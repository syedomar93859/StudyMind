import {getUsername, setUsername} from './session.js';

// provided by https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // provided by https://www.geeksforgeeks.org/javascript/username-validation-in-js-regex/
  const nameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;


document.getElementById("account-name").textContent = getUsername();

document.getElementById("go-to-ai-button")
    .addEventListener("click", goToAIPage);

function goToAIPage() {
    location.href = './ask-ai.html'
}
// navigates to the Ask AI page

// function goToHomePage() {
//     location.href = './index.html'
// }

document.getElementById("go-to-notes-button")
    .addEventListener("click", goToNotesPage);

function goToNotesPage() {
    location.href = './notes.html'
}

// navigates to the Notes page

document.getElementById("go-to-settings-button")
    .addEventListener("click", goToSettingsPage);

function goToSettingsPage(){
    location.href = './settings.html'
}

const textLink = document.getElementById("clickable-text");

if (textLink) {
    textLink.addEventListener("click", () => {
        location.href = './home.html';
    });
}
// navigates to the Home page


const content = document.getElementById("settings-content");

document.getElementById("account-link")
    .addEventListener("click", showAccount);

document.getElementById("security-link")
    .addEventListener("click", showSecurity);

document.getElementById("privacy-link")
    .addEventListener("click", showPrivacy);

// show the Account section when the page first loads
showAccount();

async function showAccount() {

    setActive("account-link");

    const currentUsername = getUsername();
    const email = await getEmail();

    content.innerHTML = `
        <h2>Account</h2>
        <label>Update your account information below:</label><br><br>

        <label for="username">Username</label><br>
        <input
            id="username"
            type="text"
            value="${currentUsername}"
        ><br><br>

        <label for="email">Email</label><br>
        <input
            id="email"
            type="email"
            value="${email}"
        ><br><br>

        <button id="save-btn">Save Changes</button>
    `;

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const saveButton = document.getElementById("save-btn");

    

    saveButton.addEventListener("click", async () => {
        try{

        const currentUsername = getUsername();

        const email = await getEmail();


        let shouldUpdateEmail = true;


        let shouldUpdateName = true;


        const errors = [];

        const newName = usernameInput.value.trim();

        const newEmail = emailInput.value.trim();

        if (newName === "") {
            errors.push("-Username is required.");
            shouldUpdateName = false;

        }
        else if (!nameRegex.test(newName)) {
            errors.push("-Username is invalid.");
            shouldUpdateName = false;

        }
        else if (newName === currentUsername) {
            // errors.push("-Username is unchanged.");
            shouldUpdateName = false;

        }
        else {
            const usernameTaken = await checkUsernameExists(newName);
            if (usernameTaken) {
                errors.push("-Username is already in use.");
                shouldUpdateName = false;

            }

        }

        if (newEmail === "") {
            errors.push("-Email is required.");
            shouldUpdateEmail = false;
        }else if (!emailRegex.test(newEmail)) {
            errors.push("-Email is invalid.");
            shouldUpdateEmail = false;
        }else if (newEmail === email){
            // errors.push("-Email is unchanged");
            shouldUpdateEmail = false;
        }else {
            const emailTaken = await checkEmailExists(newEmail);
            if (emailTaken) {
                errors.push("-Email is already in use.");
                shouldUpdateEmail = false;
            }
        } 

        if (errors.length > 0) {
            alert(errors.join("\n"));

            return;
            
        }

        const updates = [];

        if (shouldUpdateName) {
            const success = await updateAccountName(newName);
            if (success) {
                setUsername(newName);
                const accountName = document.getElementById("account-name");
                if (accountName) accountName.textContent = getUsername();
                updates.push("Username");
            }
        }

        if (shouldUpdateEmail) {
            const success = await updateAccountEmail(newEmail);
            if (success) {
                updates.push("Email");
            }
        }

        if (updates.length > 0) {
            alert(updates.join(" and ") + " updated successfully!");
        }
    }catch (err) {
        console.error(err);
        alert(err.message);
    }

    
});
}

async function updateAccountName(username) {

    const response = await fetch("/newName", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username
        })
    });

    console.log(response.status);

    const data = await response.json();

    console.log(data);

    return data.success;
}

async function updateAccountEmail(newEmail) {

    const response = await fetch("/newEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: newEmail
        })
    });

    console.log(response.status);

    const data = await response.json();

    console.log(data);

    return data.success;
}



async function getEmail() {

    const response = await fetch("/bringEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });

    const data = await response.json();

    return data.email;

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


// document.getElementById("go-to-ai-button")
//     .addEventListener("click", goToAIPage);
// document.getElementById('save-btn').addEventListener('click', getChanges());

// function getChanges(){
//     const newName = document.getElementById("username");
//     const newEmail = document.getElementById("email");
//     alert("Your new email is " + newEmail + " and your new username is " + newName + ".");
// }


async function showSecurity() {

    setActive("security-link");

    // const currentId = getAccountId();

    content.innerHTML = `
        <h2>Security</h2>
        <label>Update your account password below:</label><br><br>

        <label>Current Password</label><br>
        <input id="password" type="password">
        <button type="button" class="uncoverPass" id="viewPass"> 
                        <i class="bx bx-show"></i>
        </button>
        <br><br>

        <label>New Password</label><br>
        <input id="newPassword" type="password">
        <button type="button" class="uncoverNewPass" id="viewNewPass"> 
                        <i class="bx bx-show"></i>
        </button>
        <br><br>

        <label>Confirm Password</label><br>
        <input id="confirmPassword" type="password">
        <button type="button" class="uncoverConfirmPass" id="viewConfirmPass"> 
                        <i class="bx bx-show"></i>
        </button>
        <br><br>

        <button id="save-pass">Update Password</button>
    `;
    
    const viewPass = document.getElementById("viewPass");
    const viewNewPass = document.getElementById("viewNewPass");
    const viewConfirmPass = document.getElementById("viewConfirmPass");

    const pass = document.getElementById("password");
    const newPass = document.getElementById("newPassword");
    const confirmPass = document.getElementById("confirmPassword");
    const passButton = document.getElementById("save-pass");

    viewPass.addEventListener("click", () => {
    togglePassword(pass, viewPass);
});

viewNewPass.addEventListener("click", () => {
    togglePassword(newPass, viewNewPass);
});

viewConfirmPass.addEventListener("click", () => {
    togglePassword(confirmPass, viewConfirmPass);
});



passButton.addEventListener("click", async () => {

    const errors = [];

    const passwordMatches = await getPassword(pass.value);

    if (passwordMatches && pass.value === newPass.value) {
        errors.push("❌ New password must be different from the current password");
    }

    if (pass.value === ""){
        errors.push("❌ Current Password field is empty");
    }else if (!passwordMatches) {
        errors.push("❌ Current password is incorrect");
    }

    const passDetails = checkPassword(newPass.value);

    if (newPass.value === ""){
        errors.push("❌ New Password field is empty");
    }else if (!passDetails.success){
        errors.push(passDetails.length);
        errors.push(passDetails.number);
        errors.push(passDetails.letter);
        errors.push(passDetails.rarity);
    }

    if (confirmPass.value === "") {
        errors.push("❌ Confirm Password field is empty");
    }else if (newPass.value !== confirmPass.value) {
        errors.push("❌ New Password and Confirm Password do not match");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }else{
        const success = await updatePassword(confirmPass.value);
        
        if (!success) {
            alert("❌ Password update failed");
            return;
        }

        pass.value = "";
        newPass.value = "";
        confirmPass.value = "";
        
        alert("✅ Password has been successfully updated");
    }

    // alert("Your current password is " + pass.value + " and your new password is " + newPass.value + " and your confirmed password is " + confirmPass.value + ".");
});
}

function togglePassword(input, button) {

    const icon = button.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("bx-show", "bx-hide");
    } else {
        input.type = "password";
        icon.classList.replace("bx-hide", "bx-show");
    }

}





async function updatePassword(newPassword) {

    const response = await fetch("/newPass", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pass: newPassword
        })
    });

    const data = await response.json();

    return data.truth;

}

function checkPassword(password){

    // password.value.charCodeAt(0);


    let long = true;
    let lengthMessage = "✅ New password has at least 8 characters";

    if (password.length < 8){
        long = false;
        lengthMessage = "❌ New password has less than 8 characters";
        
    }
    // else if (){

    // }

    let hasLetter = false;
    let letterMessage = "❌ New password has no letters";

    let hasNumber = false;
    let numberMessage = "❌ New password has no numbers";;

    for (let i = 0; i < password.length; i++){
        const code = password.charCodeAt(i);
        
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            hasLetter = true;
            letterMessage = "✅ New password has at least one letter";
        }
        
        if (code >= 48 && code <= 57) {
            hasNumber = true;
            numberMessage = "✅ New password has at least one number";
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

    let rarityMessage = "✅ New password is not a commonly used password";

    if (isWeak){
        rarityMessage = "❌ New password is a common password";
    }

    return {
        length: lengthMessage,
        number: numberMessage,
        letter: letterMessage,
        rarity: rarityMessage,
        success: long && hasLetter && hasNumber && !isWeak,
    };

}

async function getPassword(password) {

    const response = await fetch("/getPass", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pass: password
        })
    });

    const data = await response.json();

    return data.truth;

}

function showPrivacy() {

    setActive("privacy-link");

    content.innerHTML = `
        <h2>Data & Privacy</h2>

        <button id="log-out" class="logout-btn">
            Log Out
        </button>

        <br><br>

        <button id="delete-acc" class="delete-btn">
            Delete Account
        </button>
    `;

    const logOut = document.getElementById("log-out");
    const deleteAccount = document.getElementById("delete-acc");

logOut.addEventListener("click", async () => {
    if (confirm("Are you sure you want to log out?")) {
        await fetch("/logout", { method: "POST" });
        sessionStorage.clear();
        location.href = './index.html';
    }
});

deleteAccount.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this account? Deleting this account means you cannot log in with it anymore. You will also be sent to the login page.") == true) {

        const success = await removeAccount();
        
        if (success) {
            location.href = "./index.html";
            sessionStorage.clear();
        } else {
            alert("Failed to delete account.");
        }

    console.log("User wants to delete account");
  } else {
    console.log("User does not want to delete account");
  }
});
}

async function removeAccount() {

    const response = await fetch("/deleteAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        return false;
    }
    
    const data = await response.json();
    return data.success;
}

function setActive(id){
    document.querySelectorAll(".sidenav a").forEach(link => link.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}