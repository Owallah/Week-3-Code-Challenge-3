document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    firstMovie()
    fetchMovies()
})


/**
 * 1. See the first movie's details, including its **poster, title, runtime,
   showtime, and available tickets** when the page loads. The number of
   available tickets will need to be derived by subtracting the number of
   `tickets_sold` from the theater's `capacity`. You will need to make a GET
   request to the following endpoint to retrieve the film data:
 *   GET /films/1

   Example Response:
   {
     "id": "1",
     "title": "The Giant Gila Monster",
     "runtime": "108",
     "capacity": 30,
     "showtime": "04:00PM",
     "tickets_sold": 27,
     "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
   }
 */
const firstMovie = () => {
    return fetch('http://localhost:3000/films/1', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(response => response.json())
    .then(movie => renderFirstMovie(movie))
    .catch(error => console.error(error.message))
}

const renderFirstMovie = (movie) => {
    let firstMovie = document.querySelector('.first-movie')
    let availableTickets = movie.capacity - movie.tickets_sold
/**
 * create  an item div and ad it to the first movie div
 */
    firstMovie.innerHTML = `
    <div class="first-movie-card">
        <div class="first-movie-card-image"><img src="${movie.poster}" ></div>
        <div class="first-movie-title"> ${movie.title} </div>
        <div class="first-movie-description"> ${movie.description}
            <div class="first-movie-runtime"> Runtime: <span class="name">${movie.runtime}</span>mins</div>
            <div class="first-movie-showtime"> Showtime: <span class="name">${movie.showtime}</span></div>
        </div>
        <h4 id = 'tickets'>Available Tickets: <span class = 'available-tickets'>${availableTickets}</span></h4>
        <div class = 'ticket-btn'>
            <button id="first-movie-book-ticket">Book Ticket</button>
        </div>
    </div>`
}


/**
 * 2. See a menu of all movies on the left side of the page in the `ul#films`
   element when the page loads. (_optional_: you can style each film in the list
   by adding the classes `film item` to each `li` element.) There is a
   placeholder `li` in the `ul#films` element that is hardcoded in the HTML —
   feel free to remove that element by editing the HTML file directly, or use
   JavaScript to remove the placeholder element before populating the list. You
   will need to make a GET request to the following endpoint to retrieve the
   film data

 * 
   GET /films

   Example response:
   [
      {
        "id": "1",
        "title": "The Giant Gila Monster",
        "runtime": "108",
        "capacity": 30,
        "showtime": "04:00PM",
        "tickets_sold": 27,
        "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
        "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
      },
      {
        "id": "2",
        "title": "Manos: The Hands Of Fate",
        "runtime": "118",
        "capacity": 50,
        "showtime": "06:45PM",
        "tickets_sold": 44,
        "description": "A family gets lost on the road and stumbles upon a hidden, underground, devil-worshiping cult led by the fearsome Master and his servant Torgo.",
        "poster": "https://www.gstatic.com/tv/thumb/v22vodart/47781/p47781_v_v8_ac.jpg"
      }
   ] 
 */
   function fetchMovies() {
    return fetch('http://localhost:3000/films', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(response => response.json())
    .then(movies => renderMovies(movies))
    .catch(error => console.error(error.message))

}
const renderMovies = function (movies) {
    console.log(movies);
    let main = document.querySelector('.grid-card')
    movies.forEach(movie => {
        let availableTickets = movie.capacity - movie.tickets_sold
        let movieCard = document.createElement('li')
        movieCard.innerHTML = `
        <div class="card">
            <div class="card-image"><img src="${movie.poster}" ></div>
            <div class="title"> ${movie.title} </div>
            <div class="description"> ${movie.description}
                <div class="runtime"> Runtime: <span class="name">${movie.runtime}</span>mins</div>
                <div class="showtime"> Showtime: <span class="name">${movie.showtime}</span></div>
            </div>
            <h4 id = 'tickets'>Available Tickets: <span class = 'available-tickets'>${availableTickets}</span></h4>
            <div class = 'ticket-btn'>
                <button id="book-ticket">Book Ticket</button>
            </div>
        </div>`

        movieCard.querySelector('#book-ticket').addEventListener('click', (e) => {
            e.preventDefault()
            //check is the ticket sold is more than capacity.
            // if yes, we disable the button
            // else we sell tickets
            if (movie.tickets_sold === movie.capacity || movie.tickets_sold >= movie.capacity) {
                movieCard.querySelector('.ticket-btn').disabled = true
                return
            } else{
                movie.tickets_sold += 1
                updateAvailableTickets(movie)
            }
        })

        main.appendChild(movieCard)
    });
}

/**
 * 3. Buy a ticket for a movie. After clicking the "Buy Ticket" button, I should
   see the number of available tickets decreasing on the frontend. I should not
   be able to buy a ticket if the showing is sold out (if there are 0 tickets
   available). **No persistence is needed for this feature**.
 * @param {*} movieObj 
 * @returns an updated movie data object with tickets sold incremented
 */
const updateAvailableTickets = function (movieObj) {
    return fetch(`http://localhost:3000/films/${movieObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(movieObj),
    })
    .then(response => response.json())
    .then(data => console.log(data))
}