// Setting OMDb API key
const apiKey = 'dcc707b6';

function searchMovies() {
    console.log("Search clicked!");
    const query = document.getElementById('searchInput').value.trim();
    const resDiv = document.getElementById('results');

    if (!query) return; // prevent empty search

    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    resDiv.innerHTML = "<p>Loading...</p>"; // show loading state

    fetch(url)
        .then(res => res.json())
        .then(data => {
            resDiv.innerHTML = ''; // clear previous results

            if (data.Response === 'True') {
                data.Search.forEach(movie => {
                    const link = document.createElement('a');
                    link.href = `movie.html?imdbID=${movie.imdbID}`;
                    link.innerHTML = `
                        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}"
                             alt="${movie.Title}" title="${movie.Title}" />
                    `;
                    resDiv.appendChild(link);
                });
            } else {
                resDiv.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(() => {
            resDiv.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
}

// Theme toggle
window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });

    // Enter key triggers search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchMovies();
        }
    });
});
