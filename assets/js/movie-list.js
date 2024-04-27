'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { search } from "./search.js";

// Collect genreName and Param from Local Storage 
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage = 1;
let totalPages = 0;

fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, function ({ results: movieList, total_pages }) {

    totalPages = total_pages;

    document.title = `${genreName} Movies - Cinematrix`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName} Movies`;

    movieListElem.innerHTML = `
        <div class="title-wrapper">
            <h1 class="heading">All ${genreName} Movies</h1>
        </div>
        <div class="grid-list"></div>
        <button class="btn load-more" load-more>Load More</button>
    `;

    for (const movie of movieList) {
        const {
            poster_path,
            title,
            vote_average,
            release_date,
            overview,
            id
        } = movie;

        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <figure class="poster-box card-banner">
                <img src="https://image.tmdb.org/t/p/w342/${poster_path}" alt="${title}" class="img-cover" loading="lazy">
                <div class="overlay-3"> 
                    <h4 class="title">${title}</h4>
                    <p class="overview">${overview}</p>
                </div>
            </figure>
            <h4 class="title">${title}</h4>
            <div class="meta-list">
                <div class="meta-item">
                    <img src="star.png" width="20" height="20" loading="lazy" alt="rating">
                    <span class="span">${vote_average.toFixed(1)}</span>
                </div>
                <div class="card-badge">${release_date.split("-")[0]}</div>
            </div>
            <a href="detail.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})"></a>
        `;

        movieListElem.querySelector(".grid-list").appendChild(card);
    }

    pageContent.appendChild(movieListElem);

    // Load More button Functionality 
    document.querySelector("[load-more]").addEventListener("click", function () {
        if (currentPage >= totalPages) {
            this.style.display = "none";
            return;
        }

        currentPage++;
        this.classList.add("loading");

        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({ results: movieList }) => {
            this.classList.remove("loading");

            for (const movie of movieList) {
                const {
                    poster_path,
                    title,
                    vote_average,
                    release_date,
                    overview,
                    id
                } = movie;

                const card = document.createElement("div");
                card.classList.add("movie-card");

                card.innerHTML = `
                    <figure class="poster-box card-banner">
                        <img src="https://image.tmdb.org/t/p/w342/${poster_path}" alt="${title}" class="img-cover" loading="lazy">
                        <div class="overlay-3"> 
                            <h4 class="title">${title}</h4>
                            <p class="overview">${overview}</p>
                        </div>
                    </figure>
                    <h4 class="title">${title}</h4>
                    <div class="meta-list">
                        <div class="meta-item">
                            <img src="star.png" width="20" height="20" loading="lazy" alt="rating">
                            <span class="span">${vote_average.toFixed(1)}</span>
                        </div>
                        <div class="card-badge">${release_date.split("-")[0]}</div>
                    </div>
                    <a href="detail.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})"></a>
                `;

                movieListElem.querySelector(".grid-list").appendChild(card);
            }
        });
    });
});

search();
