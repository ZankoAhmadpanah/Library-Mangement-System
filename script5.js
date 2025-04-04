document.addEventListener("DOMContentLoaded", function () {
    const booksContainer = document.getElementById("books-container");
    const seeMoreButton = document.createElement("button"); // Create the "See More" button
    seeMoreButton.textContent = "See More";
    seeMoreButton.className = "see-more-btn";
    let currentOffset = 0; // Tracks how many books have been loaded
    const limit = 20; // Number of books to load per request

    async function fetchBooks() {
        try {
            const response = await fetch(`https://openlibrary.org/subjects/fiction.json?limit=${limit}&offset=${currentOffset}`);
            if (!response.ok) {
                throw new Error("Failed to fetch books data.");
            }
            const data = await response.json();

            // Display each book
            data.works.forEach(book => {
                const bookCard = document.createElement("div");
                bookCard.className = "book-card";
                bookCard.innerHTML = `
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.authors[0]?.name || "Unknown Author"}</p>
                    <p><strong>Published:</strong> ${book.first_publish_year || "Unknown Year"}</p>
                `;
                booksContainer.appendChild(bookCard);
            });

            // Increment offset to load the next batch of books
            currentOffset += limit;

            // If no more books are available, hide the "See More" button
            if (data.works.length < limit) {
                seeMoreButton.style.display = "none";
            }
        } catch (error) {
            console.error(error);
            booksContainer.innerHTML = "<p>An error occurred while fetching books. Please try again later.</p>";
        }
    }

    // Attach event listener to the "See More" button
    seeMoreButton.addEventListener("click", fetchBooks);

    // Add the button to the page and fetch the initial batch of books
    booksContainer.parentElement.appendChild(seeMoreButton);
    fetchBooks();
});
