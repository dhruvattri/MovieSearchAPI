/*
Name: Dhruv Dhruv  
Student Number: 200556510  
Course: Client-Side JavaScript-03  
Assignment03: Movie Search API  
*/

// Setting OMDb API key
const apiKey = 'dcc707b6';

// Setting YouTube API key for trailer embedding
const youtubeApiKey = 'AIzaSyA4WLwQkn5sTKRvzh00yBmU_wzNaY4UpRQ';

// On page load, get movie ID from URL and fetch details
window.onload = function () {
    // Extract IMDb ID from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('imdbID');

    // If there's an IMDb ID, fetch data
    if (imdbID) {
        // Fetch movie details from OMDb API using IMDb ID
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
            .then(res => res.json()) // Convert response to JSON
            .then(data => {
                // Display movie information on the page
                displayMovieDetails(data);

                // Fetch and show YouTube trailer based on movie title
                fetchYouTubeTrailer(data.Title);
            });
    }
};

// Function to render movie information into HTML
function displayMovieDetails(movie) {
    // Set the inner HTML of the movieDetails container
    const detailsDiv = document.getElementById('movieDetails');

    detailsDiv.innerHTML = `
        <h2 class="box">${movie.Title} (${movie.Year})</h2>
        
        <div class="box">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
        </div>
        
        <div class="box"><p><b>Genre:</b> ${movie.Genre}</p></div>
        <div class="box"><p><b>Plot:</b> ${movie.Plot}</p></div>
        <div class="box"><p><b>Director:</b> ${movie.Director}</p></div>
        <div class="box"><p><b>Actors:</b> ${movie.Actors}</p></div>
        <div class="box"><p><b>IMDB Rating:</b> ${movie.imdbRating}</p></div>
        
        <div id="trailerContainer">
            <div class="trailer-box">
                <h3 style="text-align: center;">Loading trailer...</h3>
            </div>
        </div>
    `;
}

// Function to fetch a YouTube trailer based on the movie title
function fetchYouTubeTrailer(title) {
    // Format the search string for YouTube API
    const searchQuery = encodeURIComponent(`${title} trailer`);

    // Construct YouTube Data API request URL
    const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchQuery}&key=${youtubeApiKey}&type=video`;

    // Fetch trailer video ID from YouTube
    fetch(youtubeURL)
        .then(res => res.json())
        .then(data => {
            const videoId = data.items[0]?.id?.videoId;
            const trailerDiv = document.getElementById('trailerContainer');

            // If video found, embed it as an iframe
            if (videoId) {
                trailerDiv.innerHTML = `
                    <div class="trailer-box">
                        <h3 style="text-align: center;">Watch Trailer</h3>
                        <iframe width="560" height="315"
                            src="https://www.youtube.com/embed/${videoId}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                `;
            } else {
                // If no trailer found, show fallback message
                trailerDiv.innerHTML = "<p>No trailer found.</p>";
            }
        })
        .catch(() => {
            // Handle error during YouTube API fetch
            document.getElementById('trailerContainer').innerHTML = "<p>Failed to load trailer.</p>";
        });
}

// Toggle between dark/light themes
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
});

/* References & Resources:
- OMDb API: https://www.omdbapi.com/
- YouTube Data API v3: https://developers.google.com/youtube/v3/getting-started
- Used somethings which were needed and was learnt from:
  https://www.w3schools.com/
  https://www.w3schools.com/tags/tag_iframe.ASP
  https://developer.mozilla.org/en-US/docs/Web
  https://www.geeksforgeeks.org/node-js-urlsearchparams-api/
  https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp
*/