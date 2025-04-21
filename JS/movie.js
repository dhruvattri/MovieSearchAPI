const apiKey = 'dcc707b6';
const youtubeApiKey = 'AIzaSyA4WLwQkn5sTKRvzh00yBmU_wzNaY4UpRQ';

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('imdbID');

      if (imdbID) {
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                displayMovieDetails(data);
                fetchYouTubeTrailer(data.Title);
            });
    }
};
function displayMovieDetails(movie) {
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

function fetchYouTubeTrailer(title) {
    const searchQuery = encodeURIComponent(`${title} trailer`);
    const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchQuery}&key=${youtubeApiKey}&type=video`;

    fetch(youtubeURL)
        .then(res => res.json())
        .then(data => {
            const videoId = data.items[0]?.id?.videoId;
            const trailerDiv = document.getElementById('trailerContainer');

            if (videoId) {
                trailerDiv.innerHTML = `
                    <h3>Watch Trailer</h3>
                    <iframe width="560" height="315"
                        src="https://www.youtube.com/embed/${videoId}"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                `;
            } else {
                trailerDiv.innerHTML = "<p>No trailer found.</p>";
            }
        })
        .catch(() => {
            document.getElementById('trailerContainer').innerHTML = "<p>Failed to load trailer.</p>";
        });
}

window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
});
