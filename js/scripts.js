//Treehouse FSJS Techdegree Project 5:
//Public API Requests
//By Cody Reynolds

// ------------------------------------------
//  VARIABLES
// ------------------------------------------
const randomUsersUrl = 'https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location,phone,dob';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');


// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

//Obtains data from the API. Once parsed, the card generation function is called
//on the results property of the response object.
    fetch(randomUsersUrl)
    .then(response => response.json())
    .then(data => {
        generateCards(data.results);
    })


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

/**
 * generatePerson
 * Iterates over the array of people objects to generate profiles, modal card details, and listeners.
 *
 * @param {person} Object - a person object that contains properties related to personal information
 */

function generatePerson(person) {
    let personCard = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
    </div>`
    gallery.insertAdjacentHTML("beforeend", personCard);

    //Formatting for date of birth
    const month = person.dob.date.substring(5, 7);
    const day = person.dob.date.substring(8, 10);
    const year = person.dob.date.substring(0, 4);
    const normalizedDob = `${month}/${day}/${year}`

    //Formatting for phone numbers
    const normalizedPhone = `(${person.phone.substring(1,4)}) ${person.phone.substring(6, 14)}`;

    //Formatting for modal card that appears on click
    const modalCard = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">${normalizedPhone}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${normalizedDob}</p>
            </div>
        </div>
    </div> 
    `

    //Since this code will be fed into an iterating function (forEach),
    //'card' is referring to the most recent profile added to the DOM (last-child)
    let card = document.querySelector('.card:last-child');

    //Listeners on the main profile card and modal card
    card.addEventListener("click", event => {
        //Modal is added to the DOM on click
        body.insertAdjacentHTML('beforeend',modalCard);

        document.querySelector('.modal-container').addEventListener('click', (event) =>{
            if(event.target.textContent === 'X'){
                //Modal is removed from the DOM upon close
                document.querySelector('.modal-container').remove();
            }
        });

    });
}

/**
 * generateCards
 * Iterates over the array of people objects to generate profiles, modal card details, and listeners.
 *
 * @param {people} Array - an array of objects containing user data
 */

function generateCards(people) {
    people.forEach(person => {
        generatePerson(person)
    });
}