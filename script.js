// document.addEventListener("DOMContentLoaded", function () {
//   // Get DOM elements
//   const filmsList = document.getElementById("films");
//   const moviePoster = document.getElementById("movie-poster");
//   const movieTitle = document.getElementById("movie-title");
//   const movieRuntime = document.getElementById("movie-runtime");
//   const movieShowtime = document.getElementById("movie-showtime");
//   const movieTickets = document.getElementById("movie-tickets");
//   const buyTicketBtn = document.getElementById("buy-ticket-btn");
//   const movieDetails = document.getElementById("movie-details"); // Corrected ID name

//   // Fetch films data
//   fetch("/films")
//     .then((response) => response.json())
//     .then((data) => {
//       const films = data.films;
//       if (films.length > 0) {
//         films.forEach((film) => {
//           const li = document.createElement("li");
//           li.className = "film-item";
//           li.textContent = film.title;
//           li.addEventListener("click", () => showMovieDetails(film));
//           filmsList.appendChild(li);
//         });

//         showMovieDetails(films[0]);
//       } else {
//         // Handle the case when there are no films available
//         // For example, you can display a message like "No films available" on the UI.
//       }
//     })
//     .catch((error) => console.error(error));

//   function showMovieDetails(film) {
//     moviePoster.style.backgroundImage = `url(${film.poster})`;
//     movieTitle.textContent = film.title;
//     movieRuntime.textContent = `Runtime: ${film.runtime} min`;
//     movieShowtime.textContent = `Showtime: ${film.showtime}`;
//     movieTickets.textContent = `Tickets available: ${
//       film.capacity - film.tickets_sold
//     }`;

//     buyTicketBtn.disabled = film.tickets_sold >= film.capacity;
//     buyTicketBtn.textContent = film.tickets_sold >= film.capacity
//       ? "Sold Out"
//       : "Buy Ticket";
//   }
// });







document.addEventListener("DOMContentLoaded", function() {
  const filmsList = document.getElementById("films");
  const moviePoster = document.getElementById("movie-poster");
  const movieTitle = document.getElementById("movie-title");
  const movieRuntime = document.getElementById("movie-runtime");
  const movieShowtime = document.getElementById("movie-showtime");
  const movieTickets = document.getElementById("movie-tickets");
  const buyTicketBtn = document.getElementById("buy-ticket-btn");

  // Fetch films data
  fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then(films => {
      // Populate films list
      films.forEach(film => {
        const li = document.createElement("li");
        // li.className = "film-item";
        li.textContent = film.title;
        li.addEventListener("click", () => showMovieDetails(film));
        filmsList.appendChild(li);
      });

      // Show details of the first film
      fetchFilmDetails(1);
    })
    .catch(error => console.error(error));

  function fetchFilmDetails(filmId) {
    // Fetch film details
    fetch(`/films/${filmId}`)
      .then(response => response.json())
      .then(film => showMovieDetails(film))
      .catch(error => console.error(error));
  }

  function showMovieDetails(film) {
    moviePoster.style.backgroundImage = `url(${film.poster})`;
    movieTitle.textContent = film.title;
    movieRuntime.textContent = `Runtime: ${film.runtime} min`;
    movieShowtime.textContent = `Showtime: ${film.showtime}`;
    movieTickets.textContent = `Tickets available: ${film.capacity - film.tickets_sold}`;

    buyTicketBtn.disabled = film.tickets_sold >= film.capacity;
    buyTicketBtn.textContent = film.tickets_sold >= film.capacity ? "Sold Out" : "Buy Ticket";
    buyTicketBtn.addEventListener("click", () => buyTicket(film));
  }

  function buyTicket(film) {
    if (film.tickets_sold < film.capacity) {
      film.tickets_sold++;
      movieTickets.textContent = `Tickets available: ${film.capacity - film.tickets_sold}`;
      buyTicketBtn.disabled = film.tickets_sold >= film.capacity;
      buyTicketBtn.textContent = film.tickets_sold >= film.capacity ? "Sold Out" : "Buy Ticket";
    }
  }
});
