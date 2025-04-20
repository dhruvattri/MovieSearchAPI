const apiKey = 'dcc707b6';

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('imdbID');

    if (imdbID) {
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data); // testing output
            });
    }
};
function displayMovieDetails(movie) {
    const detailsDiv = document.getElementById('movieDetails');

    detailsDiv.innerHTML = `
        <h2 class="box">${movie.Title} (${movie.Year})</h2>
        <div class="box">
            <img src="${movie.Poster}" alt="${movie.Title}">
        </div>
        <p class="box"><b>Genre:</b> ${movie.Genre}</p>
        <p class="box"><b>Plot:</b> ${movie.Plot}</p>
        <p class="box"><b>Director:</b> ${movie.Director}</p>
        <p class="box"><b>Actors:</b> ${movie.Actors}</p>
        <p class="box"><b>IMDB Rating:</b> ${movie.imdbRating}</p>
    `;
}
