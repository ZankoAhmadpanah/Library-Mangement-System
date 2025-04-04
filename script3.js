document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.querySelector(".advanced-search form");
    const queryInput = document.getElementById("query");
    const categorySelect = document.getElementById("category");
    const dateInput = document.getElementById("date");
    const sortInputs = document.querySelectorAll("input[name='sort']");
    const resultsSection = document.createElement("section");
    resultsSection.className = "search-results";
    document.querySelector("main").appendChild(resultsSection);

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Clear previous results
        resultsSection.innerHTML = "";

        // Get input values
        const query = queryInput.value.trim();
        const category = categorySelect.value;
        const date = dateInput.value;
        const sortBy = Array.from(sortInputs).find(input => input.checked).value;

        if (!query) {
            resultsSection.innerHTML = "<p>Please enter a keyword to search.</p>";
            return;
        }

        try {
            // Construct the search query for the API
            let apiURL = `https://openlibrary.org/search.json?q=${query}`;
            if (category) {
                apiURL += `+${category}`;
            }

            const response = await fetch(apiURL);
            const data = await response.json();

            if (data.docs.length === 0) {
                resultsSection.innerHTML = `<p>No results found for your search.</p>`;
            } else {
                // Filter results by the exact year (if specified)
                let results = data.docs;
                if (date) {
                    const selectedYear = parseInt(date);
                    results = results.filter(book => book.first_publish_year === selectedYear);
                }

                if (results.length === 0) {
                    resultsSection.innerHTML = `<p>No results found for the year ${date}.</p>`;
                } else {
                    // Sort results by the specified order
                    if (sortBy === "newest") {
                        results = results.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
                    } else {
                        results = results.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
                    }

                    // Display results
                    const resultsList = document.createElement("ul");
                    resultsList.className = "results-list";
                    results.slice(0, 10).forEach(result => {
                        const listItem = document.createElement("li");
                        listItem.innerHTML = `
                            <h4>${result.title}</h4>
                            <p><strong>Author:</strong> ${result.author_name?.join(", ") || "Unknown Author"}</p>
                            <p><strong>First Published:</strong> ${result.first_publish_year || "Unknown Year"}</p>
                        `;
                        resultsList.appendChild(listItem);
                    });
                    resultsSection.appendChild(resultsList);
                }
            }
        } catch (error) {
            console.error(error);
            resultsSection.innerHTML = "<p>An error occurred while fetching the results. Please try again later.</p>";
        }
    });
});
