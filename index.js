
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

document.querySelector('form button').addEventListener('click', (e) => {
    
    //Get search input value
    const movieTitle = document.querySelector('#searchInput').value;

    //Initial fetch - argument think -> "the data the function using the parameter is using"
    fetchMoviesBySearch(movieTitle);

    //document.querySelector('#searchInput').value = '';


    //Handles css clean up on click
    e.preventDefault(); 
    removeFilmIcon();
    reducePadding();
    showLoader();


});


//Fetch by user Search to display list of movies
async function fetchMoviesBySearch(videoQuery) {
    try {

        //videoQuery is defined with the movieTitle.value in the function above
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
        // Using Promise.all to ensure all fetch requests are completed
        let movieData = await Promise.all(moviesReturned.Search.map(async movie => {
            const movieId = movie.imdbID;
            const response = await fetch(`https://www.omdbapi.com/?apikey=f89c6c72&i=${movieId}`);
            
            // Check if the response is OK
            //if res isn't ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                
            }
        
            // Return the JSON data if the response is successful
            return await response.json();
        }));

        // Calling renderMovies with the fully resolved movieData
        renderMovies(movieData);

        // Returning the resolved movie data
        return movieData;
    } catch (error) {
        // Improved error logging
        console.error('Error fetching movie id:', error);
    }
}



//Render movies
function renderMovies(movieHTMLData) {
    console.log(movieHTMLData);

    const movieHTMLDisplay = movieHTMLData.map((movie) => {
        return `
        <div class="movie-list__row">
            <img src="${movie.Poster}">
            <div class="movie-list__row--text__container">
                <div class="movie-list__row--text__title">
                    <h3>${movie.Title}</h3>
                    <svg xmlns="https://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                    </svg>
                    <p>${movie.imdbRating}</p> 
                </div>

                <div class="movie-list__row--text__info">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <button class="movie-list__row--text__info--btn" data-movie-id="${movie.imdbID}">
                        <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="#111827"/>
                        </svg>
                        <p>Watchlist</p>
                    </button>
                </div>

                <div class="movie-list__row--text__info--desc">
                    <p>${movie.Plot}</p>
                </div>
            </div>
            <div class="movie-list__row--hz-line"></div>
        </div>
        `;
    }).join('');


    const listContainer = document.querySelector('.movie-list__body');
    listContainer.innerHTML = movieHTMLDisplay;

    hideLoader();
    
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
  

