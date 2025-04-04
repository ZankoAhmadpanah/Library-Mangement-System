document.addEventListener("DOMContentLoaded", function () {
    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const loginFeedback = document.getElementById("login-feedback");
    const signupFeedback = document.getElementById("signup-feedback");

    // Switch between tabs
    loginTab.addEventListener("click", function () {
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
    });

    signupTab.addEventListener("click", function () {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
        signupForm.classList.add("active");
        loginForm.classList.remove("active");
    });

    // Handle Sign-Up
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("signup-username").value.trim();
        const password = document.getElementById("signup-password").value.trim();

        if (!username || !password) {
            signupFeedback.textContent = "Please fill in both fields.";
            signupFeedback.style.color = "red";
            signupFeedback.style.display = "block";
        } else {
            // Save credentials to local storage
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.find(user => user.username === username);

            if (userExists) {
                signupFeedback.textContent = "Username already exists.";
                signupFeedback.style.color = "red";
                signupFeedback.style.display = "block";
            } else {
                users.push({ username, password });
                localStorage.setItem("users", JSON.stringify(users));
                signupFeedback.textContent = "Account created successfully! You can now log in.";
                signupFeedback.style.color = "green";
                signupFeedback.style.display = "block";
                signupForm.reset();
            }
        }
    });

    // Handle Login
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (!username || !password) {
            loginFeedback.textContent = "Please fill in both fields.";
            loginFeedback.style.color = "red";
            loginFeedback.style.display = "block";
        } else if (user) {
            loginFeedback.textContent = "Login successful! Redirecting...";
            loginFeedback.style.color = "green";
            loginFeedback.style.display = "block";

            // Save the logged-in user
            localStorage.setItem("loggedInUser", username);

            // Redirect to the homepage
            setTimeout(() => {
                window.location.href = "../index1.html"; // Replace with the actual homepage URL
            }, 1500);
        } else {
            loginFeedback.textContent = "Invalid username or password.";
            loginFeedback.style.color = "red";
            loginFeedback.style.display = "block";
        }
    });
});
