// Add Event On Multiple Elements 

const addEventsOnElements = function (elements, eventType, callback) {

    for (const elem of elements) elem.addEventListener(eventType,callback);
}

// Toggle Search Box for Mobile 

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventsOnElements(searchTogglers, "click", function () {
searchBox.classList.toggle("active");
})

/**
 * Store movieId in "localStorage" when you click any movie card
 */

const getMovieDetail = function(movieId) {
    window.localStorage.setItem("movieId", String(movieId));
}


const getMovieList = function (urlParam, genreName) {
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName); 
}


// LOADER 

const preloader = document.getElementById("preloader");

// Function to hide the loader
function hideLoader() {
    preloader.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Function to show the loader
function showLoader() {
    preloader.style.display = 'grid';
    document.body.style.overflow = 'hidden'; // Block scrolling
}

// Show the loader
showLoader();

// Event listener to hide the loader when the window is fully loaded
window.addEventListener('load', hideLoader);