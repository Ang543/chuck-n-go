const jokeEl = document.getElementById('.jokeP')
const fromEl = document.getElementById('from')
const toEl = document.getElementById('to')
let apiMq = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY";
let apiOpenKey = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816";
var attractEl = document.querySelector("#attract");
var scenicEL = document.querySelector("#scenic")
var hotelEl = document.querySelector("#hotel")
var dineEL = document.querySelector("#dine")
var entEl = document.querySelector("#ent")

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

// $("#mode").on("click", function() {
//   var mode = document.querySelector('input[name="modes"]:checked').value;
//   console.log(mode);
// });
//capture user input for to and from
//angelo

//capture user input for things they want to see
//hannah



//call Mq to get route using user inputs
//dennis
mapboxgl.accessToken = 'pk.eyJ1IjoiZG1vbG9uZXk1IiwiYSI6ImNremthcmZyaTIxbzgybm9ibTcxZjFmamIifQ.q4EzfE9upNAQ9-mjDSDvVA';
navigator.geolocation.getCurrentPosition( successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position){
  setUpMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation(){
  setUpMap([-74.4057, 40.0583])
}

function setUpMap(center){
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: center,
  zoom: 8
  });

  map.addControl(new mapboxgl.NavigationControl());

  map.addControl(
      new MapboxDirections({
      accessToken: mapboxgl.accessToken
      }),
      'top-left'
      );
}

//allow user to save a trip
//angelo


//future problem-- what if user changes input