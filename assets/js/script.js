let apiMq = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY";
let apiOpenTrip = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816";

//get chuckjoke from api and display for user for every new trip

//capture user input for tansport mode
$("#mode").on("click", function() {
  var mode = document.querySelector('input[name="modes"]:checked').value;
  console.log(mode);
});
//capture user input for to and from

//capture user input for things they want to see

//call Mq to get route using user inputs

//call opentrip to get attractions along route

//allow user to save a trip