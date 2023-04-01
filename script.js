const apiKey = "3fd2be6f0c70a2a598f084ddfb75487c";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const moviesContainer = document.querySelector(".movies-container");

// Fetch movies from API
async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Display movies in the movies container
function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getColor(movie.vote_average)}">${movie.vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${movie.overview}
      </div>
    `;
    moviesContainer.appendChild(movieEl);

    // Add event listener to movie element
    movieEl.addEventListener("mouseover", () => {
      movieEl.querySelector(".overview").classList.add("show");
    });

    movieEl.addEventListener("mouseout", () => {
      movieEl.querySelector(".overview").classList.remove("show");
    });
  });
}

// Get color based on movie rating
function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Fetch popular movies on page load
window.addEventListener("load", async () => {
  const movies = await fetchMovies(apiUrl);
  displayMovies(movies);
});

// Search for movies on button click
searchBtn.addEventListener("click", async () => {
  const searchQuery = searchInput.value;
  if (searchQuery) {
    const movies = await fetchMovies(searchUrl + searchQuery);
    displayMovies(movies);
  }
});
