
document.querySelector('form button').addEventListener('click', (e) => {
    const movieTitle = document.querySelector('#searchInput').value;

    //fetch 
    fetchMoviesBySearch(movieTitle);

    //Handles css clean up on click
    e.preventDefault(); 
    removeFilmIcon()
    reducePadding() 
    showLoader()


});

async function fetchMoviesBySearch() {
    try {
        const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=f89c6c72&s=${movieTitle}`);
        const searchData = await searchResponse.json();
        //invoke function that needs search data here for next function
        console.log(searchData);
    }

    catch (error) {
        console.error('No movie with that title found. Please check spelling or try another movie!', error);
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
  


//pass in search data parameter here



/*
document.querySelector('form button').addEventListener('click', async (e) => {
    e.preventDefault(); 

    //Remove icon on click
    removeFilmIcon() 

    //Reduces Padding
    reducePadding()

    //Form input for fetch
    const movieTitle = document.querySelector('#searchInput').value;

    //var
    let movieList = ''; 

    //Animation Display
    showLoader()

    try {
        const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=f89c6c72&s=${movieTitle}`);
        const searchData = await searchResponse.json();

       //console.log(searchData)

        if (searchData) {
            let movieDetailsPromises = searchData.Search.map(movie => {
                const movieId = movie.imdbID;
                return fetch(`https://www.omdbapi.com/?apikey=f89c6c72&i=${movieId}`).then(res => res.json());
            });

            const moviesDetails = await Promise.all(movieDetailsPromises);
            moviesDetails.forEach(movie => {
                movieList += `
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
            });


            const listContainer  = document.querySelector('.movie-list__body');
            //inset adjacent html
            listContainer.innerHTML = movieList;

    
        }
    } catch (error) {
        //notfiy person viewing in the page notify message for user
        //helpful user experince standpoint
        //how will you tell them what's going on 
        //data what happens when server goes down
        //no results show get very sepcific 500 call coem back tomorrow, etc
        console.error('Error:', error);
    }

    finally {
        hideLoader();
    }

   
});



//Removing film icon on load
function removeFilmIcon() {
    const removeFilmIcon = document.querySelector('.movie-list__film-icon');
    //do id b/c this only one element
    //targeting one element with js not every single class 
    //look at multple listing layouts
    //for scalibility 
    //id one thing class multiple
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
  



//Store added movies here
const addedMovies = [];




//Adding movie to local storage
document.querySelector('.movie-list__body').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-movie-id]');

    if (btn) {
        const selectedMovie = btn.dataset.movieId;  
        const movieEl = btn.closest('.movie-list__row')
        
        
        const movieObject = {
            poster: movieEl.querySelector('img').src,
            title: movieEl.querySelector('.movie-list__row--text__title h3').textContent,
            rating: movieEl.querySelector('.movie-list__row--text__title p').textContent,
            runtime: movieEl.querySelector('.movie-list__row--text__info p:first-child').textContent,
            genre: movieEl.querySelector('.movie-list__row--text__info p:nth-child(2)').textContent,
            id: selectedMovie, 
            plot: movieEl.querySelector('.movie-list__row--text__info--desc p').textContent,


        }
        


        addedMovies.push(movieObject)


    }

    storeInLocalStorage(addedMovies)
    
});





function storeInLocalStorage(movieArray) {
    const jsonString = JSON.stringify(movieArray)
    localStorage.setItem('movieArray',jsonString );

}




*/