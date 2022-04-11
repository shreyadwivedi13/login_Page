// storing data in the array of objects to perform filtering
var usersDataList = JSON.parse(localStorage.getItem("usersDataList")) || [];
const searchBar = document.querySelector(".admin-panel__search"); // filtering the data by the search bar
let filteredData = usersDataList;
const adminContentBlock = document.querySelector(".admin-panel__content"); // displaying the data

const displayUsers = () => {
    filteredData.forEach((user) => {
        const row = `
        <div class="admin-panel__row">
            <div class="admin-pane__item">
                <p>${user.username}</p>
                <h2>${user.firstName} ${user.lastName}</h2>
                <p><span>Email: </span>${user.email}</p>
                <p><span>Password: </span>${user.password}</p>
            </div>
            <div class="admin-pane__item">
                <button class="btn btn--edit" onclick="popup()">Edit</button>
                <button class="btn btn--del">Delete</button>
            </div>
        </div>
    `;

        adminContentBlock.insertAdjacentHTML("beforeend", row);
    });
};

displayUsers();

searchBar.addEventListener("input", () => {
    filteredData = usersDataList.filter((user) => {
        return (
            user.firstName.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            user.username.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchBar.value.toLowerCase())
        );
    });

    adminContentBlock.innerHTML = "";

    if (filteredData.length > 0) {
        displayUsers();
    } else {
        adminContentBlock.insertAdjacentHTML(
            "beforeend",
            `<p class="no-results">No results found</p>`
        );
    }
});

// deleting the users by clicking the delete button in the admin panel and updating data in the local storage
const deleteBtns = document.querySelectorAll(".btn--del");
console.log(deleteBtns);
deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const username =
            event.target.parentElement.parentElement.childNodes[1].childNodes[1]
            .textContent; // getting the username of the user to be deleted
        console.log(username);
        const userIndex = usersDataList.findIndex(
            (user) => user.username === username
        );
        usersDataList.splice(userIndex, 1);
        localStorage.setItem("usersDataList", JSON.stringify(usersDataList));
        window.location.reload();
    });
});

// editing the users by clicking the edit button in the admin panel and updating data in the local storage
const editBtns = document.querySelectorAll(".btn--edit");
editBtns.forEach((btn) => {
    btn.addEventListener(
        "click",
        addEventListener("click", (event) => {
            const username =
                event.target.parentElement.parentElement.childNodes[1].childNodes[1]
                .textContent; // getting the username of the user to be edited
            console.log(username);
            const userIndex = usersDataList.findIndex(
                (user) => user.username === username // finding the index of the user to be edited
            );
            document.getElementById("firstName").defaultValue = usersDataList[userIndex].firstName;
            document.getElementById("lastName").defaultValue = usersDataList[userIndex].lastName;
            document.getElementById("email").defaultValue = usersDataList[userIndex].email;
            document.getElementById("username").defaultValue = usersDataList[userIndex].username;
            document.getElementById("password").defaultValue = usersDataList[userIndex].password;

            //setting default values in the form as the existing values
            //popup();
            const saveBtn = document.querySelector(".btn--save"); // saving the edited data
            saveBtn.addEventListener("click", (event) => {

                event.preventDefault();

                //setting values to the form

                const firstName = document.querySelector("#firstName").value;
                const lastName = document.querySelector("#lastName").value;
                const usernameO = username;
                const email = usersDataList[userIndex].email;
                const password = usersDataList[userIndex].password;

                if (firstName === "" || lastName === "") {
                    if (firstName === "") {
                        document.getElementById("errorname").innerHTML = "This field cannot be empty";
                        document.getElementById("firstName").style.background = "#d89994";
                        document.getElementById("errorname").style.color = "#d00";
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

                    // alert("Please fill in all fields");

                }

                // updating the data in the local storage
                const updatedUserInfo = {
                    firstName: firstName,
                    lastName: lastName,
                    username: usernameO,
                    email: email,
                    password: password,
                };




                usersDataList[userIndex] = updatedUserInfo;
                console.log(updatedUserInfo);
                localStorage.setItem("usersDataList", JSON.stringify(usersDataList));
                adminContentBlock.innerHTML = "";
                popup();
                displayUsers();
            });
        })
    );
});
const signoutBtn = document.querySelector("#signout"); // signout button
signoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    //sessionStorage.removeItem("activeUsername"); // removing the active username from the session storage
    window.location.href = "index.html"; // redirecting to the index page
});

function popup() {
    const blur = document.getElementById("blur");
    const popup = document.getElementById("popup");
    blur.classList.toggle("active");
    popup.classList.toggle("show");
}