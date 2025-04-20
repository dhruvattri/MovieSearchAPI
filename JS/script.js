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
                // TODO: loop through movies and display posters

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
