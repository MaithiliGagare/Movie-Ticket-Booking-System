🎟️ Ticket Booking System

A responsive, cinema-style seat booking interface built with HTML, CSS and JavaScript. Pick your seats, see the price update live, and confirm your booking. No frameworks or installation needed.

Features
Triangular seat map with a curved cinema screen
Three seat states: available, selected and booked
Row-based pricing with a live seat count and total
Book seats, Clear selection and Reset all actions
Bookings saved in localStorage, so they survive a page refresh
Toast notifications for every action
Responsive layout, keyboard accessible, respects reduced-motion settings
Project Structure
ticket-booking-system/
├── index.html
├── CSS/
│   └── style.css
└── JS/
    └── script.js
Getting Started
Clone the repository:
bash
Open the folder and double-click index.html in your browser.
How to Use
Click a seat to select it. Click it again to deselect.
Check your seats and total in the Your booking panel.
Click Book seats to confirm. Booked seats are locked.
Use Clear selection to drop your current selection, or Reset all to clear every booking.
Customization


Colors and spacing are controlled by the CSS variables at the top of CSS/style.css.

Built With
HTML5
CSS3 (custom properties, grid, flexbox)
JavaScript (ES6+)
Future Improvements
Multiple movies and show timings
User login and booking history
Backend and database integration
Payment gateway integration
