/*
    This is the js file index page, it will handle user-admin log in and sign-up Page.
    @auther : Shreya Dwivedi
*/

const mainBlock = document.querySelector(".main"); // main block
const loginForm = document.querySelector("#login"); // login form
const userLoginBtn = document.querySelector("#user-login"); // user login button
const adminLoginBtn = document.querySelector("#admin-login"); // admin login button
const loginHeading = document.querySelector(".login__heading"); // login heading
const loginBackBtn = document.querySelector(".login__back"); // login back button
const dontHaveAccount = document.querySelector("#signup"); // dont have account node
const signupViewerBtn = document.querySelector(".login__signup-btn"); // signup form viewing button
const signupForm = document.querySelector("#signup-form"); // signup form
const signupBackBtn = document.querySelector(".signup__back"); // signup back button
const signupSubmitBtn = document.querySelector("#signup-submit"); // signup submit button
var regexEmail = /^([a-z 0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})$/;

// Displaying the user login form on the main block
userLoginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    mainBlock.classList.replace("main", "inactive");
    loginForm.classList.replace("inactive", "login");
    loginHeading.innerText = "User Login";
    dontHaveAccount.classList.replace("inactive", "login__dont-have-account");
});

// Displaying the admin login form on the main block
adminLoginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    mainBlock.classList.replace("main", "inactive");
    loginForm.classList.replace("inactive", "login");
    loginHeading.innerText = "Admin Login";
});

// Displaying the login form selection on the main block
loginBackBtn.addEventListener("click", (event) => {
    event.preventDefault();
    mainBlock.classList.replace("inactive", "main");
    loginForm.classList.replace("login", "inactive");
    dontHaveAccount.classList.replace("login__dont-have-account", "inactive");
});

// Displaying the signup form on the main block
signupViewerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    signupForm.classList.replace("inactive", "signup");
    loginForm.classList.replace("login", "inactive");
});

// Displaying the login form for user on back click
signupBackBtn.addEventListener("click", (event) => {
    event.preventDefault();
    signupForm.classList.replace("signup", "inactive");
    loginForm.classList.replace("inactive", "login");
});

// Verifying and inserting the user data into the database on signup submit
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document.querySelector("#firstname").value;
    const lastName = document.querySelector("#lastname").value;
    const email = document.querySelector("#email").value;
    const username = document.querySelector("#signup-username").value;
    const password = document.querySelector("#signup-password").value;
    if (firstName === "" || lastName === "" || email === "" || username === "" || password === "") {
        if (firstName === "") {
            document.getElementById("errorname").innerHTML = "This field cannot be empty";
            document.getElementById("firstname").style.background = "#d89994";
            document.getElementById("errorname").style.color = '#d00';
        } else {
            document.getElementById("firstname").style.background = "#d1ffd1";
        }
        if (lastName === "") {
            document.getElementById("errorname1").innerHTML = "This field cannot be empty";
            document.getElementById("lastname").style.background = "#d89994";
            document.getElementById("errorname1").style.color = '#d00';
        } else {
            document.getElementById("lastname").style.background = "#d1ffd1";
        }
        if (email === "") {
            document.getElementById("errorname3").innerHTML = "This field cannot be empty";
            document.getElementById("email").style.background = "#d89994";
            document.getElementById("errorname3").style.color = '#d00';
        } else {
            document.getElementById("email").style.background = "#d1ffd1";
        }
        if (username === "") {
            document.getElementById("errorname2").innerHTML = "This field cannot be empty";
            document.getElementById("signup-username").style.background = "#d89994";
            document.getElementById("errorname2").style.color = '#d00';
        } else {
            document.getElementById("signup-username").style.background = "#d1ffd1";
        }
        if (password === "") {
            document.getElementById("errorname4").innerHTML = "This field cannot be empty";
            document.getElementById("signup-password").style.background = "#d89994";
            document.getElementById("errorname4").style.color = '#d00';
        } else {
            document.getElementById("signup-password").style.background = "#d1ffd1";
        }
        //alert("Please fill in all fields");

    } else if (password.length < 6) {
        document.getElementById("signup-password").style.background = "#d89994";
        document.getElementById("errorname4").innerHTML = "password should have alteast 7 characters";
        document.getElementById("errorname4").style.color = '#d00'
            // alert("Password must be at least 6 characters");
    } else if (!regexEmail.test(email)) {
        document.getElementById("email").style.background = "#d89994";
        document.getElementById("errorname3").innerHTML = "Invalid email";
        document.getElementById("errorname3").style.color = '#d00'
            //alert("Please enter a valid email");
    } else {
        const user = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };

        if (isUserPresent(user)) {
            document.getElementById("email").style.background = "#d89994";
            document.getElementById("signup-username").style.background = "#d89994";
            document.getElementById("errorname3").innerHTML = "email taken";
            document.getElementById("errorname3").style.color = '#d00';
            document.getElementById("errorname2").innerHTML = "username taken";
            document.getElementById("errorname2").style.color = '#d00';

            //alert("User already exists");
            signupForm.reset();
            return;
        }

        const usersDataList =
            JSON.parse(localStorage.getItem("usersDataList")) || [];
        usersDataList.push(user);
        localStorage.setItem("usersDataList", JSON.stringify(usersDataList));
        signupForm.reset();
        alert("Account created successfully");

        signupForm.classList.replace("signup", "inactive");
        loginForm.classList.replace("inactive", "login");
    }
});

// Reading the user data from the database and comparing it with the user input and displaying the appropriate message
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (username === "" || password === "") {
        document.getElementById("username").style.background = "#d89994";
        document.getElementById("password").style.background = "#d89994";
        document.getElementById("login-error").innerHTML = "invalid credentials";
        document.getElementById("login-error").style.color = '#d00';
        //alert("Please fill in all fields");
        //username.style.border = "1px solid red";
        //password.style.border = "1px solid red";
    } else if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
        alert("Admin login successful");
        window.location.href = "admin-panel.html";
        return;
    } else {
        const usersDataList =
            JSON.parse(localStorage.getItem("usersDataList")) || [];

        const user = usersDataList.find(
            (userData) =>
            userData.username === username && userData.password === password
        );

        console.log(user);

        if (user) {
            sessionStorage.setItem("activeUsername", user.username);
            alert("Login successful");
            window.location.href = "user-panel.html";
        } else {
            document.getElementById("username").style.background = "#d89994";
            document.getElementById("password").style.background = "#d89994";
            document.getElementById("login-error").innerHTML = "invalid credentials";
            document.getElementById("login-error").style.color = '#d00';
            //alert("Incorrect username or password");
        }
    }
});