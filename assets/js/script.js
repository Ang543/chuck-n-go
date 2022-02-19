const jokeEl = document.getElementById('.jokeP')
const fromEl = document.getElementById('start')
const toEl = document.getElementById('destination')
let apiMQ = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY"
let apiOpenTrip = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816";
var attractEl = document.querySelector("#attract");
var scenicEL = document.querySelector("#scenic")
var hotelEl = document.querySelector("#hotel")
var dineEL = document.querySelector("#dine")
var entEl = document.querySelector("#ent")
var savedTripsDiv = document.querySelector("#saved-trips-container");
var modeChoice = document.querySelector('input[name="modes"]:checked').value;
var thingsToSee = [];
var whereTo = "";
var activity = "";
var placesEl = document.querySelector("#places-container");
var SearchTerm = document.querySelector("#search-term");
var historyEl = document.querySelector("#history")


//to get inputs into history box
function renderHistory() {
  var savedTrips = JSON.parse(localStorage.getItem("trips")) || []; // short circuit
  historyEl.innerHTML = "";
  for (let i = 0; i < savedTrips.length; i++) {
    var newButton = document.createElement("button");
    newButton.classList.add('history-button');
    newButton.textContent = "From " + savedTrips[i].origin + " to " + savedTrips[i].destination
    newButton.setAttribute("data-origin", savedTrips[i].origin);
    newButton.setAttribute("data-destination", savedTrips[i].destination);
    historyEl.append(newButton)
  }
}





//get chuckjoke from api and display for user for every new trip
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

// show the chuck norris joke on website
showJoke = (dataObjects, div) => {
  const dataDiv = document.querySelector(div)
  dataObjects.forEach(dataObject => {
    const dataElement = document.createElement('p')
    dataElement.innerText = `Name: ${dataObject.name}`
    dataDiv.append(dataElement)
  })

}
jokeData()

//call Mq to get route using user inputs
// default map layer
let map = L.map('map', {
  layers: MQ.mapLayer(),
  center: [40.0583, -74.4057],
  zoom: 8
});

//to get directions on the map
function runDirection(start, end) {
  map.remove();
  // recreating new map layer after removal
  map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [40.0583, -74.4057],
    zoom: 12
  });

  var dir = MQ.routing.directions();

  dir.route({
    locations: [
      start,
      end
    ]

  });

  //create icons for from and to
  CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createStartMarker: (location) => {
      var custom_icon;
      var marker;

      custom_icon = L.icon({
        iconUrl: './assets/image/red.png',
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29]
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    },

    createEndMarker: (location) => {
      var custom_icon;
      var marker;

      custom_icon = L.icon({
        iconUrl: './assets/image/blue.png',
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29]
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    }
  });

  map.addLayer(new CustomRouteLayer({
    directions: dir,
    fitBounds: true
  }));
}


// function that runs when form submitted
function submitForm(event) {
  event.preventDefault();

  // getting form data
  start = document.getElementById("start").value;
  end = document.getElementById("destination").value;

  // bundle the data
  var trip = {
    origin: start,
    destination: end
  }

  //save to localStorage
  var savedTrips = JSON.parse(localStorage.getItem("trips")) || []; // short circuit
  savedTrips.push(trip);

  localStorage.setItem("trips", JSON.stringify(savedTrips))
  renderHistory();

  // run directions function
  runDirection(start, end);
  getLonLat(start, end);

  // reset form
  document.getElementById("form").reset();
}

// asign the form to form variable
const form = document.getElementById('form');

// call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);

//to get the lon and lat from the directions
function getLonLat(start, end) {
  fetch("http://www.mapquestapi.com/geocoding/v1/batch?key=" + apiMQ + "&location=" + start + "&location=" + end)
    .then(response => {
      return response.json()
    })
    .then(data => console.log(data));

};

//clear the history box
$("#clear-history").bind("click", (function () {

  localStorage.clear();

}));

//to add the start and end from history to the map
historyEl.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches(".history-button")) {
    var dataO = element.getAttribute("data-origin");
    var dataD = element.getAttribute("data-destination");
    runDirection(dataO, dataD)
  };
});

renderHistory();