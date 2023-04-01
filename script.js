const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c';

// Select the DOM elements
const form = document.querySelector('form');
const searchInput = document.querySelector('input[type="search"]');
const mainSection = document.querySelector('#main');

// Function to fetch data from API
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Function to display movie cards
function displayMovies(movies) {
  // Clear the main section
  mainSection.innerHTML = '';

  movies.forEach(movie => {
    const { poster_path, title, vote_average, overview } = movie;

    // Create elements
    const movieCard = document.createElement('div');
    const movieImage = document.createElement('img');
    const movieTitle = document.createElement('h2');
    const movieRating = document.createElement('span');
    const movieOverview = document.createElement('p');

    // Set attributes and text content
    movieCard.classList.add('movie-card');
    movieImage.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    movieImage.alt = `${title} poster`;
    movieTitle.textContent = title;
    movieRating.textContent = vote_average.toFixed(1);
    movieOverview.textContent = overview;

    // Append elements to movie card
    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieRating);
    movieCard.appendChild(movieOverview);

    // Append movie card to main section
    mainSection.appendChild(movieCard);
  });
}

// Event listener for form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get search query
  const searchQuery = searchInput.value.trim();

  // Fetch movies from API
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
  const movies = await fetchData(searchUrl);

  // Display movies
  displayMovies(movies);
});

// Get popular movies on page load
const popularUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
fetchData(popularUrl)
  .then(movies => displayMovies(movies));
