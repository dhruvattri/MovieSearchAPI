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
