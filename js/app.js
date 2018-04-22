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
  console.log(employees);
  fillCards();
}

function fillCards() {
  for(let i = 0; i < employees.length; i++) {
    let currentCard = document.getElementById(`employee${i}`);
    currentCard.getElementsByTagName("img")[0].setAttribute("src", `${employees[i].picture.medium}`);
    currentCard.getElementsByClassName("fullname")[0].textContent = `${employees[i].name.first}  ${employees[i].name.last}`;
    currentCard.getElementsByClassName("email")[0].textContent = `${employees[i].email}`;
    currentCard.getElementsByClassName("city")[0].textContent = `${employees[i].location.city}`;
  }
}