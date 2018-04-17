<<<<<<< HEAD
/*=========================*/
/*  Jennifer Nordell       */
/*  Treehouse Techdegree   */
/*  Project 5              */
/*  Employee Directory     */
/*=========================*/

let employees = null;

$.ajax({
  url: 'https://randomuser.me/api/?nat=us,gb&results=12',
  dataType: 'json',
  success: function(data) {
    employees = data.results;
  }
});

