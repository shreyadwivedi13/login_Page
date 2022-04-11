const heading = document.querySelector(".user-panel__heading"); // user panel heading

const activeUsername = sessionStorage.getItem("activeUsername"); // getting the active username from the session storage

heading.innerText = `Welcome, ${activeUsername}!`; // displaying the active username in the user panel heading

// storing data in the array of objects to perform filtering
const usersDataList = JSON.parse(localStorage.getItem("usersDataList")) || [];

const editBtn = document.querySelector(".btn--edit");
editBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const username = activeUsername;

    const userIndex = usersDataList.findIndex(
        (user) => user.username === username // finding the index of the user to be edited
    );
    const user = usersDataList[userIndex];
    const editForm = `
        <form class="edit-form">
            <div class="edit-form__item">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" value="${user.firstName}">
                <span class="error" id="errorname"></span>
            </div>
            <div class="edit-form__item">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" value="${user.lastName}">
                <span class="error" id="errorname1"></span>
            </div>
            <div class="edit-form__item">
                <label for="username">Username</label>
                <input type="text" id="username" value="${user.username}" disabled>
            </div>
            <div class="edit-form__item">
                <label for="email">Email</label>
                <input type="text" id="email" value="${user.email}" disabled>
            </div>
            <div class="edit-form__item">
                <label for="password">Password</label>
                <input type="text" id="password" value="${user.password}">
                <span class="error" id="errorname4"></span>
            </div>
            <div class="edit-form__item">
                <button class="btn btn--save">Save</button>
            </div>
            <button class="btn btn--signout" id="signout">Signout</button>
            
        </form>
     `;
    const displayContentBlock = document.querySelector(".user-panel");
    displayContentBlock.innerHTML = "";
    displayContentBlock.insertAdjacentHTML("afterbegin", editForm);
    const saveBtn = document.querySelector(".btn--save"); // saving the edited data
    saveBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        if (firstName === "" || lastName === "" || password === "") {
            if (firstName === "") {
                document.getElementById("errorname").innerHTML = "This field cannot be empty";
                document.getElementById("firstName").style.background = "#d89994";
                document.getElementById("errorname").style.color = '#d00';
            } else {
                document.getElementById("firstName").style.background = "#d1ffd1";
            }
            if (lastName === "") {
                document.getElementById("errorname1").innerHTML = "This field cannot be empty";
                document.getElementById("lastName").style.background = "#d89994";
                document.getElementById("errorname1").style.color = '#d00';
            } else {
                document.getElementById("lastName").style.background = "#d1ffd1";
            }
            if (password === "") {
                document.getElementById("errorname4").innerHTML = "This field cannot be empty";
                document.getElementById("password").style.background = "#d89994";
                document.getElementById("errorname4").style.color = '#d00';
            } else {
                document.getElementById("password").style.background = "#d1ffd1";
            }
            //alert("Please fill in all fields");

        } else if (password.length < 6) {
            document.getElementById("password").style.background = "#d89994";
            document.getElementById("errorname4").innerHTML = "password should have alteast 7 characters";
            document.getElementById("errorname4").style.color = '#d00';
            // alert("Password must be at least 6 characters");
        }

        // updating the data in the local storage
        usersDataList[userIndex] = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
        };
        localStorage.setItem("usersDataList", JSON.stringify(usersDataList));

    });
    const signoutBtn = document.querySelector("#signout"); // signout button
    signoutBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        sessionStorage.removeItem("activeUsername"); // removing the active username from the session storage
        window.location.href = "index.html"; // redirecting to the index page
    });
});

function displayUserInfo() {
    const userIndex = usersDataList.findIndex(
        (user) => user.username === activeUsername // finding the index of the user to be edited
    );
    const user = usersDataList[userIndex];
    const row = `
      <div class="admin-panel__row">
          <div class="admin-pane__item">
              <p>${user.username}</p>
              <h2>${user.firstName} ${user.lastName}</h2>
              <p><span>Email: </span>${user.email}</p>
              <p><span>Password: </span>${user.password}</p>
          </div>
          <button class="btn btn--signout" id="signout">Signout</button>
      </div>
  `;
    const displayContentBlock = document.querySelector(".user-panel");
    displayContentBlock.innerHTML = "";
    displayContentBlock.insertAdjacentHTML("afterbegin", row);
    const signoutBtn = document.querySelector("#signout"); // signout button
    signoutBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        sessionStorage.removeItem("activeUsername"); // removing the active username from the session storage
        window.location.href = "index.html"; // redirecting to the index page
    });
}

const signoutBtn = document.querySelector("#signout"); // signout button
signoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    sessionStorage.removeItem("activeUsername"); // removing the active username from the session storage
    window.location.href = "index.html"; // redirecting to the index page
});