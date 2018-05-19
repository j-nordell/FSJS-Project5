/*=========================*/
/*  Jennifer Nordell       */
/*  Treehouse Techdegree   */
/*  Project 5              */
/*  Employee Directory     */
/*=========================*/

let employees = null;

getEmployees();

function getEmployees() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
  if(xhr.readyState === 4) {
    employees = JSON.parse(xhr.responseText).results;
    initApplication();
  }
  }; 
  xhr.open("GET", "https://randomuser.me/api/?nat=us,gb&results=12");
  xhr.send();
}

function initApplication() {
  fillCards();
  setupModal();
}

function fillCards() {
  for(let i = 0; i < employees.length; i++) {
    let currentCard = document.getElementById(`employee${i}`);
    currentCard.getElementsByTagName("img")[0].setAttribute("src", `${employees[i].picture.large}`);
    currentCard.getElementsByClassName("fullname")[0].textContent = `${employees[i].name.first}  ${employees[i].name.last}`;
    currentCard.getElementsByClassName("email")[0].textContent = `${employees[i].email}`;
    currentCard.getElementsByClassName("city")[0].textContent = `${employees[i].location.city}`;
  }
 }

 function setupModal() {
   // Get the modal
    let modal = document.getElementById('modal');

    //let card = document.getElementById("employee0");
    let cards = document.getElementsByClassName("card");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    for(let card of cards) {
      card.onclick = () => {
        modal.style.display = "block";
        let index = card.id;
        console.log(index);
        fillModal();
      };
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }

    function fillModal(e) {
      let modalContent = document.getElementById("modal-content");
      modalContent.getElementsByTagName("img")[0].setAttribute("src", `${employees[0].picture.large}`);
    }
 }
