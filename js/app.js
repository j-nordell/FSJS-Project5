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
  console.log(employees);  // it's still null here
}
