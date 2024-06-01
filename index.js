
document.querySelector('form button').addEventListener('click', (e) => {
    
    //Get search input value
    const movieTitle = document.querySelector('#searchInput').value;

    //Initial fetch - argument think -> "the data the function's going to use"
    fetchMoviesBySearch(movieTitle);

    //Handles css clean up on click
    e.preventDefault(); 
    removeFilmIcon()
    reducePadding() 
    showLoader()


});


//Fetch by user Search to display list of movies
async function fetchMoviesBySearch(videoQuery) {
    try {
        const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=f89c6c72&s=${videoQuery}`);
        const searchData = await searchResponse.json();
        //console.log(searchData);

        //Invoking getMovieIdArray
        getMovieId(searchData)
    }

    catch (error) {
        console.error('No movie with that title found. Please check spelling or try searching another movie.', error);
    }
}


//Fetch by ID to store in localStorage
async function getMovieId(moviesReturned) {
    console.log(moviesReturned)
    try {
        let movieData = moviesReturned.Search.map(async movie => {
            const movieId = movie.imdbID;
            const response = await fetch(`https://www.omdbapi.com/?apikey=f89c6c72&i=${movieId}`);
            //console.log(response)
            return await response.json();
        });
        //Defining parameter
        renderMovies(movieData)

        return await Promise.all(movieData);
    } catch (error) {
        console.error('Error fetching movie id:', error);
    }
}






function removeFilmIcon() {
    const removeFilmIcon = document.querySelector('.movie-list__film-icon');
    removeFilmIcon.classList.add('remove');
}

function reducePadding() {
    const paddingContainer = document.querySelector(".movie-list__body");
    paddingContainer.classList.add("active");


}



//Loading animation
function showLoader() {
    const loaderHtml = '<div class="loader"></div>';
    const listContainer = document.querySelector('.movie-list__body');
    listContainer.innerHTML = loaderHtml;
}


  function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.remove();
    }
  }
  

