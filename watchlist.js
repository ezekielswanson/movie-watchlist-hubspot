


/*
make names as literal as possible 
ex below: userWatchListInLocalStorage
helps with not digging through files
as doing code "Don't make me think" as clear as possible
make as easy as possible to find things 
-think how it cascades down
leave bread crumbs
-how to render out ui for
-2 different files try not to duplicate the code
-ex ones added to watchlist green border you'd have to update 
css styles in multiple places
-make it more obiouvs
-make template with resuable same functions

*/

let addedMovies = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedMovies = localStorage.getItem("movieArray");

    if (storedMovies) {
        addedMovies = JSON.parse(storedMovies)
    }

    else {
        addedMovies = [];
    }

    updateUI();
    
})

//check if movies are in local storage and then invoke
function updateUI() {

    //check if movies are in local storage   
    if (addedMovies.length > 0) {
        displayAddedMovies();
        removeMovie();
        reducePadding();
        removeBtn()
    }
    
}



/*

data from customer 
how would you make it how you get the most amount of data from 
how would you get customer insights on said data

*/



function reducePadding() {
    const paddingContainer = document.querySelector(".movie-list__body");
    paddingContainer.classList.add("active");


}


//Naming 



function renderHTML(movies) {
    //logging to see if movies array  renders
    //console.log(movies)
   
    const watchListHTML = movies.map((movie) => {

        //logging to see if movie object renders
       //console.log(movie)
        return `
            <div class="movie-list__row">
            <img src="${movie.poster}">
            <div class="movie-list__row--text__container">
                <div class="movie-list__row--text__title">
                    <h3>${movie.title}</h3>
                    <svg xmlns="https://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                    </svg>
                    <p>${movie.rating}</p> 
                </div>

                <div class="movie-list__row--text__info">
                    <p>${movie.runtime}</p>
                    <p>${movie.genre}</p>
                    <button class="movie-list__row--text__info--btn" data-movie-id="${movie.id}">
                        <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="#111827"/>
                        </svg>
                        <p>Remove</p>
                    </button>
                </div>

                <div class="movie-list__row--text__info--desc">
                    <p>${movie.plot}</p>
                </div>
            </div>
            <div class="movie-list__row--hz-line"></div>
        </div>
        `;
    }).join('');

    return watchListHTML;
   
}



//render movies
function displayAddedMovies() {
    const container = document.querySelector('.movie-list__body.watchlist');
    //log to see if the element is selected
    //console.log(container)
    //define renterHTML argument with the addedMovies array
    container.innerHTML = renderHTML(addedMovies);
    
}





function removeMovie() {
    document.querySelector('.movie-list__body.watchlist').addEventListener('click', (event) => {
        const btn = event.target.closest('.movie-list__row--text__info--btn');

        if (btn && btn.hasAttribute('data-movie-id')) {

            //Preventing bubbling to parent container
            event.stopImmediatePropagation(); 

            const movieId = btn.getAttribute('data-movie-id');
            //Log the movie ID 
            //console.log(movieId); 

            //gets me access to the array - still in a string from the server
            //this is a string
            const movieToRemove = localStorage.getItem("movieArray");
            
            //getting data from server parse it into usable data
            //string into object here
            const selectedMovies = JSON.parse(movieToRemove);

            //log to ensure data's parsed
            //console.log(selectedMovies);   

           //filter out based on id movieId 
           //If current id d/n match movieId
           const filteredMovies = selectedMovies.filter(movie => {
                return movieId !== movie.id
           })

            //console.log("Number of movies before filtering:", selectedMovies.length);
            //console.log("Number of movies after filtering:", filteredMovies.length);

          //Update local storage with filtered array
          localStorage.setItem('movieArray', JSON.stringify(filteredMovies))

          addedMovies = filteredMovies;

          //pass in movieArray array from local storage 
          //console.log(addedMovies)
          
          //Update html
          displayAddedMovies();

          //Display message if no movies are in the watchlist  
          if (filteredMovies.length === 0) {
            addDisplayAfterMoviesRemoved();
            removeBtnNoDisplay();
        }

        }
    });
}



function removeBtn()  {

    //create btn 
    const btn = document.createElement('button');
    btn.classList.add('movie-list__body--remove-btn');
    btn.textContent = "Clear Watchlist"

    //container 
    const container = document.querySelector('.watchlist-controls');
    container.appendChild(btn);
    //console.log(container);
    
    // Event listener to clear the watchlist
    btn.addEventListener('click', () => {
        localStorage.clear();
        addedMovies = [];
        displayAddedMovies();
        addDisplayAfterMoviesRemoved();
        removeBtnNoDisplay();


    });

}

function removeBtnNoDisplay()  {
    //get btn 
    const btn = document.querySelector('.movie-list__body--remove-btn');
    btn.classList.add('empty');
}



function addDisplayAfterMoviesRemoved() {
    const container = document.querySelector('.movie-list__body.watchlist');
    container.classList.add('removed')
    container.innerHTML = `
    <div class="movie-list__body--text-container">
        <h2>Your watchlist is looking a little empty...</h2>
        <a href="index.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM10.125 5.625C10.125 5.00368 9.62132 4.5 9 4.5C8.37868 4.5 7.875 5.00368 7.875 5.625V7.875H5.625C5.00368 7.875 4.5 8.37868 4.5 9C4.5 9.62132 5.00368 10.125 5.625 10.125H7.875V12.375C7.875 12.9963 8.37868 13.5 9 13.5C9.62132 13.5 10.125 12.9963 10.125 12.375V10.125H12.375C12.9963 10.125 13.5 9.62132 13.5 9C13.5 8.37868 12.9963 7.875 12.375 7.875H10.125V5.625Z" fill="#363636"/>
            </svg>
            <h3>Let’s add some movies!</h3>
        </a>
    </div
    
    `
}

