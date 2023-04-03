document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    firstMovie()
    fetchMovies()
})

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
            <button id="book-ticket">Book Ticket</button>
        </div>
    </div>`
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

        // document.querySelector('#book-ticket').addEventListener('click', () => {
        //     console.log('clicked');
        // })

        main.appendChild(movieCard)
    });
}