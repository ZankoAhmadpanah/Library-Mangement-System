document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchQuery = document.getElementById("search-query");
    const bookContainer = document.getElementById("book-container");
    const logoutButton = document.getElementById("logout-btn");

    searchForm.addEventListener("submit", async function (event) {
        // Prevent the form from resetting or refreshing the page
        event.preventDefault();

        // Clear previous results
        bookContainer.innerHTML = "";

        const query = searchQuery.value.trim();

        if (!query) {
            bookContainer.innerHTML = "<p>Please enter a search term.</p>";
            return; // Stop further execution if the query is empty
        }

        try {
            const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }

            const data = await response.json();

            if (data.docs.length === 0) {
                bookContainer.innerHTML = `<p>No books found for "${query}".</p>`;
            } else {
                data.docs.slice(0, 10).forEach(book => {
                    const bookCard = document.createElement("div");
                    bookCard.className = "book-card";
                    bookCard.innerHTML = `
                        <h4>${book.title}</h4>
                        <p><strong>Author:</strong> ${book.author_name?.join(", ") || "Unknown Author"}</p>
                        <p><strong>First Published:</strong> ${book.first_publish_year || "Unknown"}</p>
                    `;
                    bookContainer.appendChild(bookCard);
                });
            }
        } catch (error) {
            console.error(error); // Log the error to the console for debugging
            bookContainer.innerHTML = "<p>An error occurred while fetching data. Please try again later.</p>";
        }
    });

    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    // Load saved messages from local storage for debugging or testing
    const savedMessages = JSON.parse(localStorage.getItem("submittedMessages")) || [];

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formFeedback.textContent = "Please fill in all fields!";
            formFeedback.style.color = "red";
            formFeedback.style.display = "block";
            return;
        }

        if (!validateEmail(email)) {
            formFeedback.textContent = "Please enter a valid email address!";
            formFeedback.style.color = "red";
            formFeedback.style.display = "block";
            return;
        }

        const messageData = {
            name,
            email,
            message,
        };

        // Save the message to local storage
        savedMessages.push(messageData);
        localStorage.setItem("submittedMessages", JSON.stringify(savedMessages));

        // Redirect to the Reports page
        window.location.href = "./Reaports/index.html";
    });

    // Email validation function
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
     // Log Out functionality
     logoutButton.addEventListener("click", function () {
        // Clear session data from localStorage
        localStorage.removeItem("loggedInUser");
        alert("You have been logged out.");
        // Redirect to the login page
        window.location.href = "./ورود و ثبت نام/index.html";
    });
});
