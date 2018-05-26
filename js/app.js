/*=========================*/
/*  Jennifer Nordell       */
/*  Treehouse Techdegree   */
/*  Project 5              */
/*  Employee Directory     */
/*=========================*/
'use strict';
let allEmployees = null;

getEmployees();

// Get the 12 random employees from the APi from either the US or Great Britain
function getEmployees() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
  if(xhr.readyState === 4) {
    allEmployees = JSON.parse(xhr.responseText).results;
    initApplication();
  }
  };
  xhr.open("GET", "https://randomuser.me/api/?nat=us,gb&results=12");
  xhr.send();
}

// Set up the application
function initApplication() {
  let searchBox = document.getElementById("search");
  let clearButton = document.getElementsByTagName("button")[0];

  fillCards(allEmployees);
  setupModal(allEmployees);

  searchBox.addEventListener("keyup", function() {
    searchEmployees();
  });

  clearButton.addEventListener("click", function() {
    fillCards(allEmployees);
  });

  document.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
    e.preventDefault();
  });
}

// add the employee information as text into the appropriate places in the cards for the collection sent
function fillCards(employeeList) {
  for(let i = 0; i < employeeList.length; i++) {
    let currentCard = document.getElementById(`${i}`);
    currentCard.getElementsByTagName("img")[0].setAttribute("src", `${employeeList[i].picture.large}`);
    currentCard.getElementsByClassName("fullname")[0].textContent = `${employeeList[i].name.first}  ${employeeList[i].name.last}`;
    currentCard.getElementsByClassName("email")[0].textContent = `${employeeList[i].email}`;
    currentCard.getElementsByClassName("city")[0].textContent = `${employeeList[i].location.city}`;
    currentCard.style.display = "block";
  }
 }


 // Set up the basic modal with navigation controls and ways to exit the modal
 function setupModal(employeeList) {
   // Get the modal
    let modal = document.getElementById('modal');

    //let card = document.getElementById("employee0");
    let cards = document.getElementsByClassName("card");

    // Get the <span> element that closes the modal
    let closeX = document.getElementsByClassName("close")[0];

    // Get the spans for navigation
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");

    for(let card of cards) {
      card.onclick = () => {
        modal.style.display = "block";
        let index = parseInt(card.id);
        fillModal(employeeList[index]);
      };
    }
    // Clicking on the X causes the modal to close
    closeX.onclick = () => {
        modal.style.display = "none";
    };

    // Clicking outside of the modal cause it to close
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    };

    // Get the previous employee and fill in the modal with their information
    prev.onclick = (e) => {
      let currentEmail = document.getElementById("modal-email").textContent.toLowerCase();
      let employeeId = getEmployeeId(currentEmail);
      let adjustedIndex = ((employeeId - 1) + allEmployees.length) % allEmployees.length;
      fillModal(allEmployees[adjustedIndex]);
    };

    // Get the next employee and fill in the modal with their information
    next.onclick = (e) => {
      let currentEmail = document.getElementById("modal-email").textContent.toLowerCase();
      let employeeId = getEmployeeId(currentEmail);
      let adjustedIndex = ((employeeId + 1) + allEmployees.length) % allEmployees.length;
      fillModal(allEmployees[adjustedIndex]);
    };
  }

// Identify which employee is currently loaded into the modal
function getEmployeeId(email) {
    let personId;
    for(let i = 0; i < allEmployees.length; i++) {
      if(allEmployees[i].email === email) {
        personId = i;
        return i;
      }
    }
    return null;
}

function fillModal(employee) {
  let modalContent = document.getElementById("modal-content");
  let country;
  let birthday = new Date(employee.dob).toLocaleDateString();

  country = `${employee.nat}` === "US" ? "United States" : "Great Britain";

  modalContent.getElementsByTagName("img")[0].setAttribute("src", `${employee.picture.large}`);
  document.getElementById("modal-fullname").innerText = `${employee.name.first}  ${employee.name.last}`;
  document.getElementById("modal-username").innerText = `${employee.login.username}`;
  document.getElementById("modal-email").innerText = `${employee.email}`;
  document.getElementById("modal-city").innerText = `${employee.location.city}`;
  document.getElementById("modal-telephone").innerText = `${employee.phone}`;
  document.getElementById("modal-street").innerText = `${employee.location.street}\u00A0\u00A0${employee.location.city}, ${country}\u00A0\u00A0${employee.location.postcode}`;
  document.getElementById("modal-birthdate").innerText = `Birthday: ${birthday}`;
}


  function searchEmployees() {
    let searchResults = [];
    hideAllEmployees();
    // Obtain the value of the search input
    let searchString = document.getElementById("search").value.toLowerCase();

    // If the search field contains an empty string reset back to default search
    if(searchString == "") {
        fillCards(allEmployees);
    }

    // Search through the employees' names and usernames for the text in the textbox and create a new list
    for(var i = 0; i < allEmployees.length; i++) {
        let firstName = allEmployees[i].name.first.toLowerCase();
        let lastName = allEmployees[i].name.last.toLowerCase();
        let username = allEmployees[i].login.username.toLowerCase();
        if(firstName.includes(searchString) || lastName.includes(searchString) || username.includes(searchString) ) {
            searchResults.push(allEmployees[i]);
        }
    }

    fillCards(searchResults);
    setupModal(searchResults);
  }

// Hide all the employees to make room for search results
function hideAllEmployees() {
  let cards = document.getElementsByClassName("card");
  for(let card of cards) {
    card.style.display = "none";
  }
}
