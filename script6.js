document.addEventListener("DOMContentLoaded", function () {
    const membersContainer = document.getElementById("members-container");

    function fetchLoggedInUsers() {
        // Retrieve logged-in usernames from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const loggedInUser = localStorage.getItem("loggedInUser"); // Active user session

        if (users.length === 0 && !loggedInUser) {
            membersContainer.innerHTML = "<li>No logged-in members at the moment.</li>";
            return;
        }

        // Display all users who have logged in
        users.forEach(user => {
            const memberItem = document.createElement("li");
            memberItem.textContent = user.username; // Show only usernames
            membersContainer.appendChild(memberItem);
        });

        // Highlight currently logged-in user
        if (loggedInUser) {
            const currentUser = document.createElement("li");
            currentUser.textContent = `Active User: ${loggedInUser}`;
            currentUser.style.fontWeight = "bold";
            currentUser.style.color = "black";
            membersContainer.appendChild(currentUser);
        }
    }

    // Call the function to populate members list
    fetchLoggedInUsers();
});
