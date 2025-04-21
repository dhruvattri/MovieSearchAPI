const apiKey = 'dcc707b6';

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('imdbID');

      if (imdbID) {
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data); // testing output
                displayMovieDetails(data);
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
        <div id="trailerContainer"><h3>Loading trailer...</h3></div>
    `;
}
function fetchYouTubeTrailer(title) {
    console.log("Fetching trailer for: ", title); // debug stub
}

window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
});
