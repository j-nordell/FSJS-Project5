/*=========================*/
/*  Jennifer Nordell       */
/*  Treehouse Techdegree   */
/*  Project 5              */
/*  Employee Directory     */
/*=========================*/

let allEmployees = null;

getEmployees();

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

function initApplication() {
  fillCards(allEmployees);
  setupModal();
  console.log(allEmployees[0]);
}

function fillCards(employeeList) {
  for(let i = 0; i < employeeList.length; i++) {
    let currentCard = document.getElementById(`${i}`);
    currentCard.getElementsByTagName("img")[0].setAttribute("src", `${employeeList[i].picture.large}`);
    currentCard.getElementsByClassName("fullname")[0].textContent = `${employeeList[i].name.first}  ${employeeList[i].name.last}`;
    currentCard.getElementsByClassName("email")[0].textContent = `${employeeList[i].email}`;
    currentCard.getElementsByClassName("city")[0].textContent = `${employeeList[i].location.city}`;
  }
 }

 function setupModal(employeeList) {
   // Get the modal
    let modal = document.getElementById('modal');

    //let card = document.getElementById("employee0");
    let cards = document.getElementsByClassName("card");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    for(let card of cards) {
      card.onclick = () => {
        modal.style.display = "block";
        let index = parseInt(card.id);
        fillModal(index);
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
  }



  function fillModal(index) {
    let modalContent = document.getElementById("modal-content");
    modalContent.getElementsByTagName("img")[0].setAttribute("src", `${allEmployees[index].picture.large}`);
    document.getElementById("modal-fullname").innerText = `${allEmployees[index].name.first}  ${allEmployees[index].name.last}`;
    document.getElementById("modal-email").innerText = `${allEmployees[index].email}`;
  }

