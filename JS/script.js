/*
Name: Dhruv Dhruv  
Student Number: 200556510  
Course: Client-Side JavaScript-03  
Assignment03: Movie Search API  
*/

// Setting OMDb API key
const apiKey = 'dcc707b6';

// Function to search for movies using the OMDb API
function searchMovies() {
    // Get the trimmed value from the search input field
    const query = document.getElementById('searchInput').value.trim();

    // If the input is empty, do nothing
    if (!query) return;

    // Get the container to show search results
    const resDiv = document.getElementById('results');

    // Show a loading message while fetching results
    resDiv.innerHTML = "<p>Loading...</p>";

    // Construct the OMDb API URL with the user's search query
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    // Fetch data from OMDb API
    fetch(url)
        .then(res => res.json()) // Parse the response to JSON
        .then(data => {
            // Clear previous results
            resDiv.innerHTML = '';

            // Check if the API returned a valid response
            if (data.Response === 'True') {
                // Loop through each movie in the search result
                data.Search.forEach(movie => {
                    // Create a clickable link to movie.html with the IMDb ID
                    const link = document.createElement('a');
                    link.href = `movie.html?imdbID=${movie.imdbID}`;

                    // Add the movie poster inside the link
                    link.innerHTML = `<img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}"
                                        alt="${movie.Title}" title="${movie.Title}" />`;

                    // Add the link to the results container
                    resDiv.appendChild(link);
                });
            } else {
                // Show message if no movies were found
                resDiv.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(() => {
            // Handle network/API errors gracefully
            resDiv.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
}

// Wait until HTML is fully loaded before attaching events
window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');

    // Check localStorage for saved theme and apply it
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }

    // Toggle theme and update localStorage
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // Allow pressing Enter to trigger the search
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            searchMovies();
        }
    });
});


/* References & Resources:
- OMDb API: https://www.omdbapi.com/
- YouTube Data API v3: https://developers.google.com/youtube/v3/getting-started
-Used toggle() which was also my Bonus lab
- Used somethings which were needed and was learnt from:
  https://www.w3schools.com/
  https://www.w3schools.com/tags/tag_iframe.ASP
  https://developer.mozilla.org/en-US/docs/Web
  https://www.geeksforgeeks.org/node-js-urlsearchparams-api/
  https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp
*/
