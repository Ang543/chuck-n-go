const jokeEl = document.getElementById('.jokeP')
let apiMq = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY";
let apiOpenTrip = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816";

//get chuckjoke from api and display for user for every new trip
//dennis
function jokeData() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then(response => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then(data => { 
      console.log(data.value)
      document.getElementById("jokeP").append(data.value)     
    })
    .catch(error => {
      console.log(error)
    });
  }

  showJoke = (dataObjects, div) => {
    const dataDiv = document.querySelector(div)
    dataObjects.forEach(dataObject => {
        const dataElement = document.createElement('p')
        dataElement.innerText= `Name: ${dataObject.name}`
        dataDiv.append(dataElement)
    })

}
  jokeData()

//capture user input for tansport mode
//hannah

$("#mode").on("click", function() {
  var mode = document.querySelector('input[name="modes"]:checked').value;
  console.log(mode);
});
//capture user input for to and from
//angelo

//capture user input for things they want to see
//hannah

//call Mq to get route using user inputs
//dennis

//call opentrip to get attractions along route
//salieu

//allow user to save a trip
//angelo


//future problem-- what if user changes input