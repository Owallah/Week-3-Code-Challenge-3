document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
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

        main.appendChild(movieCard)
    });
}