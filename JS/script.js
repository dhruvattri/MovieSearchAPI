// Setting OMDb API key
const apiKey = 'dcc707b6';
function searchMovies() {
    const query = document.getElementById('searchInput').value;
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data); 
    });
}
