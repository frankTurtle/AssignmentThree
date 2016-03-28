// Barret J. Nobel
// Assignment 3
// Internet and Web Tech
// March 23th, 2016
// Professor Lili Hai

// Function that resets the results after user confirmation
function resetResults(){
   if (confirm("You sure you want to reset?") == true) {
      document.getElementById( "username" ).value = "";
      document.getElementById( "password" ).value = "";
   }
   else {
      return false;
   }
}

// Function to log the user in
// sample data is supplied in the placeholder text
function login(){
   if( document.getElementById( "username" ).value != "frank" &&
   	   document.getElementById( "password" ).value != "123456" ){
   		alert( "Try again" );
   }
   else{
   	document.getElementById( "orderButton" ).disabled = false;
	document.getElementById( "changeButton" ).disabled = false;
   	alert( "Welcome Frank!" );
   }
}

// Function to place an order
// gives a total of all dishes ordered
// supplies the table number as well as a random order number
function placeOrder(){
	var quantities = new Array(); //.......................................................... array's to hold the quantity, label, and prices of all foods ordered
	var labels = new Array();
	var prices = new Array();

	for( var i = 0; i < 8; i++ ){ //.......................................................... loops through each label
		if( document.getElementById("number" + (i+1)).value > 0 ){ //......................... only cares about ones that are filled in
			quantities.push( document.getElementById("number" + (i+1)) ); //.................. populates array's with values from labels and user input
			labels.push( document.getElementById("number" + (i+1) + "Label").innerHTML );
			prices.push( document.getElementById("number" + (i+1) + "Price").innerHTML );
		}
	}

	var body = document.body; //.............................................................. get the body element
	var tbl  = document.createElement('table'); //............................................ create a new table
    tbl.style.width  = '100px'; //............................................................ width 100px

    for( var row = 0; row < 3; row++ ){ //.................................................... loop through each row
        var tr = tbl.insertRow(); //.......................................................... create a new row
        for( var j = 0; j < labels.length; j++ ){ //.......................................... loop through each label
            var td = tr.insertCell(); //...................................................... create a new cell for the row
            td.appendChild( document.createTextNode(getString(j, row)) ); //.................. attach it to the td as a string 
        }
   	}

   	// Internal Function
   	// based on which row it's currently on it will return the appropriate index
   	// 0: is the labels array
   	// 1: is the quantities array
   	// 2: is the prices array
   	function getString( index, arrayIn ){
		switch( arrayIn ){
			case 0:
				return labels[index];
			case 1:
				return quantities[index].value;
			case 2:
				return prices[index];
		}
	}	

	var total = document.createElement( 'h1' ); //....................................................................... create a new header element for the total
	total.appendChild( document.createTextNode('Total: $' + getTotal() + '.00') ); //.................................... append the formatted string wit the total

	// Internal Function
	// gets the total for all the meals and returns the value
	function getTotal(){
		var returnTotal = 0;

		for( var index in prices ){ //.................................................................................... loop through each price and get the total * quantity
			var price = prices[index];
			returnTotal += ( parseInt(price.substring(1, price.indexOf("."))) * parseInt(quantities[index].value) );  
		}

		return returnTotal;
	}
 
    body.appendChild( tbl ); //................................................. append the table to teh body
    body.appendChild( total ); //............................................... append the total element to the body after the table

    var order = "Table: " + document.getElementById( "formTable" ).value +  //.. create a string to print the recepit header
    		    " -- Order Number: " + orderNumber();
	document.getElementById( "order" ).innerHTML = order; //.................... update the order div element
}

// Function to return the randomly generated order number ( String )
// four digits
function orderNumber(){
	var orderNumber = "";
	for( var i = 0; i < 4; i++ ){ orderNumber += Math.floor((Math.random() * 9) + 1); }

	return orderNumber;
}

// Function to reset the form once the change order button is pressed
function changeOrder(){
	document.getElementById( "dishForm" ).reset();
}

// Function to kick off the loading of the dishOrder page
// enables the buttons
// sets the current date
function start(){
	document.getElementById( "orderButton" ).disabled = true; //... enable buttons
	document.getElementById( "changeButton" ).disabled = true;

	var date = document.getElementById( "date" ); //............... set current date
	setTodaysDate();
   	date.addEventListener( "change", checkReservation, false ); //. if date changes, check to see its not in teh past
}

// Function to set the current date to today
function setTodaysDate(){
	var date = new Date(); //............................ creates a new Date object
	var day = date.getDate(); //......................... gets the day, month, and year from it
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;

	var today = year + "-" + month + "-" + day;

	document.getElementById( "date" ).value = today; //.. set the date element's value to the date object
}

// Function to check if the reservation is valid
// throws an error if not and resets the date element's value to the current date
function checkReservation(){
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var dateToCheck = document.getElementById( "date" ).valueAsDate;

	var dayToCheck = dateToCheck.getDate() + 1;
	var monthToCheck = dateToCheck.getMonth() + 1;
	var yearToCheck = dateToCheck.getFullYear();

	if( (dayToCheck < day) || (monthToCheck < month) || (yearToCheck < year) ){
		window.alert("Date has to be in the future!");
		setTodaysDate();
	}
}

window.addEventListener( "load", start, false );