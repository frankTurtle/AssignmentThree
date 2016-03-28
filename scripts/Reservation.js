// Barret J. Nobel
// Assignment 3
// Internet and Web Tech
// March 20th, 2016
// Professor Lili Hai

var date = new Date(); //............. variable to hold the currrent date

var day = date.getDate(); //.......... variable to hold the current day
var month = date.getMonth() + 1; //... variable to hold the current month
var year = date.getFullYear(); //..... variable to hold the current year yyyy

// This function is kicked off when the reservation page is loaded
function start(){
   var date = document.getElementById( "date" ); //................. the date element on the page
   date.addEventListener( "change", checkReservation, false ); //... add a listener to it whenever it changes its fired

   setTodaysDate(); //.............................................. sets the current date for today
}

// Function to check the reservation is in the future
// fires whenever the date is changed
function checkReservation(){
   var dateToCheck = document.getElementById( "date" ).valueAsDate; //.............. gets the current date in the form to check

   var dayToCheck = dateToCheck.getDate() + 1; //................................... variables to get the day, month, and year
   var monthToCheck = dateToCheck.getMonth() + 1;
   var yearToCheck = dateToCheck.getFullYear();

   if( (dayToCheck < day) || (monthToCheck < month) || (yearToCheck < year) ){ //... if the date in the form is lower than current date alert them and reset the date
      window.alert("Date has to be in the future!");
      setTodaysDate();
   }
}

// Function to reset the form
function resetResults(){
   if (confirm("You sure you want to clear the form?") == true) { //. asks the user to confirm they want to reset
      document.getElementById( "form" ).reset();
   }
   else {
      return false;
   }
}

// Function that will submit the form
function submitForm(){
   var form = document.getElementById( "gatherInfo" );
   confirmData(); //...................................... prints a confirmation to the screen prior to submitting the form

   document.getElementById( "form" ).submit();
}

// Function to print the confirmation data to the screen once the user submits
function confirmData() {
   var form = document.getElementById( "gatherInfo" ); //....................... get all the form elements to print
   var partySize = document.getElementById( "formParty" ).value;
   var phoneNumber = document.getElementById( "formPhone" ).value;
   var name = document.getElementById( "formName" ).value;
   var email = document.getElementById( "formEmail" ).value;
   var date = document.getElementById( "date" ).value;
   var time = document.getElementById( "formTime" ).value;
   
   var htmlToWrite = "<h3>Confirmation</h3><table class='table-fill'>" + //...... create an HTML string to return
   "<thead></thead>" + 
   "<tr><th class = 'text-left'>Party Size</th>" + 
   "<th class = 'text-left'>Phone Number</th>" + 
   "<th class = 'text-left'>Name</th></tr>" +
   "<tbody class = 'table-hover'>" +
   "<tr><td class = 'text-left'>" + partySize + "</td>" +
   "<td class = 'text-left'>" + phoneNumber + "</td>" +
   "<td class = 'text-left'>" + name + "</td></tr>" +
   "<tr><th class = 'text-left'>Email</th>" + 
   "<th class = 'text-left'>Date</th>" + 
   "<th class = 'text-left'>Time</th></tr>" +
   "<tr><td class = 'text-left'>" + email + "</td>" +
   "<td class = 'text-left'>" + date + "</td>" +
   "<td class = 'text-left'>" + time + "</td></tr>" +
   "</tbody>"+
   "</table>";

   userLocalStorage(); //........................................................ sets the sessionStorage userName to the current one in the form

   form.innerHTML = htmlToWrite; //.............................................. overwrite the form with this data
}

// Function to set the date elements data to teh current date
function setTodaysDate(){
   if (month < 10) month = "0" + month; //............... if the month is less than 10 add a leading zero
   if (day < 10) day = "0" + day; //..................... same for day

   var today = year + "-" + month + "-" + day; //........ variable to represent today

   document.getElementById( "date" ).value = today; //.... set the date element's value to the date
}

// Function to set the sessionStorage userName value to the name entered
function userLocalStorage(){
   var name = document.getElementById( "formName" ).value;
   sessionStorage.setItem( 'userName', name );
}

window.addEventListener( "load", start, false );
