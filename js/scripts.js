//Treehouse FSJS Techdegree Project 5:
//Public API Requests
//By Cody Reynolds

// ------------------------------------------
//  VARIABLES
// ------------------------------------------
const usersUrl = 'https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location,phone,dob';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');



// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------


function fetchUsers(url) {
    return fetch(url)
    .then(results => results.json())
    .then(data => generateCards(data.results))
    //.then(data => console.log(data.results))
    .catch(err => console.log('Something went wrong:', err));
}

fetchUsers(usersUrl);


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateCards(data) {
    const cards = data.map(person => {
        return `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>`
    }).join('');

    gallery.insertAdjacentHTML("afterbegin", cards);
}


// ------------------------------------------
//  LISTENERS
// ------------------------------------------













// HTML for search feature
// <form action="#" method="get">
// <input type="search" id="search-input" class="search-input" placeholder="Search...">
// <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>

// HTML for gallery cards
// <div class="card">
// <div class="card-img-container">
//     <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
// </div>
// <div class="card-info-container">
//     <h3 id="name" class="card-name cap">first last</h3>
//     <p class="card-text">email</p>
//     <p class="card-text cap">city, state</p>
// </div>
// </div>


// HTML for modal cards
// <div class="modal-container">
// <div class="modal">
//     <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//     <div class="modal-info-container">
//         <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//         <h3 id="name" class="modal-name cap">name</h3>
//         <p class="modal-text">email</p>
//         <p class="modal-text cap">city</p>
//         <hr>
//         <p class="modal-text">(555) 555-5555</p>
//         <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//         <p class="modal-text">Birthday: 10/21/2015</p>
//     </div>
// </div>

// IMPORTANT: Below is only for exceeds tasks 
// <div class="modal-btn-container">
//     <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//     <button type="button" id="modal-next" class="modal-next btn">Next</button>
// </div>
// </div>