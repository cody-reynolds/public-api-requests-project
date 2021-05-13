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

    fetch(randomUsersUrl)
    .then(response => response.json())
    .then(data => {
        generateCards(data.results);
    })


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

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
                <p class="modal-text">${person.phone}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${person.dob.date}</p>
            </div>
        </div>
    </div> 
    `

    let card = document.querySelector('.card:last-child');


    card.addEventListener("click", event => {
        body.insertAdjacentHTML('beforeend',modalCard);

        document.querySelector('.modal-container').addEventListener('click', (event) =>{
            if(event.target.textContent === 'X'){
                document.querySelector('.modal-container').remove();
            }
        });

    });
}

function generateCards(people) {
    people.forEach(person => {
        generatePerson(person)
    });
}