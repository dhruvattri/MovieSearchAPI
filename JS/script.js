// Setting OMDb API key
const apiKey = 'dcc707b6';
function searchMovies() {
    console.log("Search clicked!");
    const query = document.getElementById('searchInput').value;
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const resDiv = document.getElementById('results');
            resDiv.innerHTML = ''; // clear previous results

            if (data.Response === 'True') {
                data.Search.forEach(movie => {
                    const link = document.createElement('a');
                    link.href = `movie.html?imdbID=${movie.imdbID}`;
                    link.innerHTML = `<img src="${movie.Poster}" alt="${movie.Title}" title="${movie.Title}" />`;
                    resDiv.appendChild(link);
                });
            } else {
                resDiv.innerHTML = 'No movies found.';
            }
        });
}
window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
});
