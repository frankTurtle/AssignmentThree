// Barret J. Nobel
// Assignment 3
// Internet and Web Tech
// March 27th, 2016
// Professor Lili Hai

// Function to run when the home page loads
// checks if the userName is stored, and greets them by name if so
function start(){
	if( window.sessionStorage.getItem( 'userName' ) ){
		var output = "<h1>Hi " + sessionStorage.getItem( 'userName' ) + "</h1>"; //. create output string
		document.getElementById( "greeting" ).innerHTML = output; //................ set the HTML
	}	
}

window.addEventListener( "load", start, false );