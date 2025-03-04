let selectedSeats = new Set();
let currentMovie = '';
let currentPrice = 0;

function selectMovie(movieName, price) {
    currentMovie = movieName;
    currentPrice = price;
    document.getElementById('booking-section').classList.remove('hidden');
    document.getElementById('selected-movie').textContent = movieName;
    document.getElementById('ticket-price').textContent = price;
    generateSeats();
    scrollToBooking();
}

function generateSeats() {
    const seatContainer = document.getElementById('seat-container');
    seatContainer.innerHTML = '';
    
    // Generate 6 rows of 8 seats each
    for (let i = 0; i < 48; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.dataset.seatNumber = i + 1;
        seat.textContent = i + 1;
        
        // Randomly mark some seats as occupied
        if (Math.random() < 0.3) {
            seat.classList.add('occupied');
        } else {
            seat.addEventListener('click', () => toggleSeat(seat));
        }
        
        seatContainer.appendChild(seat);
    }
}

function toggleSeat(seat) {
    if (seat.classList.contains('occupied')) return;
    
    const seatNumber = seat.dataset.seatNumber;
    if (selectedSeats.has(seatNumber)) {
        selectedSeats.delete(seatNumber);
        seat.classList.remove('selected');
    } else {
        selectedSeats.add(seatNumber);
        seat.classList.add('selected');
    }
    
    updateBookingSummary();
}

function updateBookingSummary() {
    const selectedSeatsCount = selectedSeats.size;
    const totalPrice = selectedSeatsCount * currentPrice;
    
    document.getElementById('selected-seats').textContent = selectedSeatsCount;
    document.getElementById('total-price').textContent = totalPrice;
}

function confirmBooking() {
    if (selectedSeats.size === 0) {
        alert('Please select at least one seat.');
        return;
    }
    
    const seatsArray = Array.from(selectedSeats);
    const message = `Booking Confirmed!\n\nMovie: ${currentMovie}\nSeats: ${seatsArray.join(', ')}\nTotal Price: $${selectedSeats.size * currentPrice}`;
    alert(message);
    
    // Reset selection
    selectedSeats.clear();
    document.querySelectorAll('.seat.selected').forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('occupied');
    });
    updateBookingSummary();
}

function scrollToBooking() {
    document.getElementById('booking-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Any initial setup can go here
});