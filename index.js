
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


/* Fetch by ID to store in localStorage
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
*/

//Fetch by ID to store in localStorage
async function getMovieId(moviesReturned) {
    console.log(moviesReturned)
    try {
        // Using Promise.all to ensure all fetch requests are completed
        let movieData = await Promise.all(moviesReturned.Search.map(async movie => {
            const movieId = movie.imdbID;
            const response = await fetch(`https://www.omdbapi.com/?apikey=f89c6c72&i=${movieId}`);
            
            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                
            }
        
            
            // Return the JSON data if the response is successful
            return await response.json();
        }));

        // Calling renderMovies with the fully resolved movieData
        //renderMovies(movieData);

        // Returning the resolved movie data
        return movieData;
    } catch (error) {
        // Improved error logging
        console.error('Error fetching movie id:', error);
    }
}


//Need to add the redner movie function now look at the line above
//renderMovies(movieData);






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
  

