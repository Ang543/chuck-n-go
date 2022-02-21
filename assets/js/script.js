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
// var thingsToSee = [];
var endLat = "";
var endLng = "";
var startLat = "";
var startLng = "";
var lowerLat = "";
var higherLat = "";
var lowerLng = "";
var higherLng = "";
var activity = "";
var placesEl = document.querySelector("#places-container");
var placesEl2 = document.querySelector("#places-container2");
var placesEl3 = document.querySelector("#places-container3");
var SearchTerm = document.querySelector("#search-term");


var savedTrips = JSON.parse(localStorage.getItem("trips")) || []; // short circuit

for (let i = 0; i < savedTrips.length; i++) {
  var newButton = document.createElement("button");
  newButton.textContent = "From " + savedTrips[i].origin + " to " + savedTrips[i].destination

  savedTripsDiv.append(newButton)
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

showJoke = (dataObjects, div) => {
  const dataDiv = document.querySelector(div)
  dataObjects.forEach(dataObject => {
    const dataElement = document.createElement('p')
    dataElement.innerText = `Name: ${dataObject.name}`
    dataDiv.append(dataElement)
  })

}



showJoke = (dataObjects, div) => {
  const dataDiv = document.querySelector(div)
  dataObjects.forEach(dataObject => {
    const dataElement = document.createElement('p')
    dataElement.innerText = `Name: ${dataObject.name}`
    dataDiv.append(dataElement)
  })


}
jokeData()

// default map layer
let map = L.map('map', {
  layers: MQ.mapLayer(),
  center: [40.0583, -74.4057],
  zoom: 8
});







function runDirection(start, end) {

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
  console.log(start, end);


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
      startLat = JSON.stringify(location.latLng.lat);
      startLng = JSON.stringify(location.latLng.lng);
      console.log(startLat, startLng);
     

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
      endLat = JSON.stringify(location.latLng.lat);
      endLng = JSON.stringify(location.latLng.lng);
      console.log(endLat, endLng);

      if (startLat >= endLat) {
        lowerLat = endLat;
        lowerLng = endLng;
        higherLat = startLat;
        higherLng = startLng;
        console.log(lowerLat, lowerLng);
      } else {
        lowerLat = startLat;
        lowerLng = startLng;
        higherLat = endLat;
        higherLng = endLng;
      }





      if (activity = "amusements") {
        placesToSee();
      }
      if (activity = "accomodations") {
        placesToSee2();
      }
      if (activity = "foods") {
        placesToSee3();
      }

      return marker;

    }


  });



  map.addLayer(new CustomRouteLayer({
    directions: dir,
    fitBounds: true
  }));

  // console.log('this is where placesToSee will be called')


      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    
  };

  map.addLayer(new CustomRouteLayer({
    directions: dir,
    fitBounds: true
  }));


// function that runs when form submitted
function submitForm(event) {
  event.preventDefault();


  // delete current map layer
  map.remove();



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

  //display places to see and list after user submits their input
  document.getElementById("places").style.display = "block";

  // reset form
  document.getElementById("form").reset();
}

// asign the form to form variable
const form = document.getElementById('form');

// call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);

// //to get the lon and lat from the directions
// function getLonLat(start, end) {
//   fetch("http://www.mapquestapi.com/geocoding/v1/batch?key=" + apiMQ + "&location=" + start + "&location=" + end)
//     .then(response => {
//       return response.json()
//     })
//     .then(data => console.log(data));


var placesToSee = function () {

  var opentripUrl = ("http://api.opentripmap.com/0.1/en/places/bbox?lon_min=" + lowerLng + "&lat_min=" + lowerLat + "&lon_max=" + higherLng + "&lat_max=" + higherLat + "&kinds=" + activity + "&format=geojson&apikey=" + apiOpenTrip + "&limit=10");

  fetch(opentripUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      

      console.log(startLat, startLng);



      for (var i = 0; i < data.features.length; i++) {
        // format repo name
        var whereToList = data.features[i].properties.name
        console.log(whereToList);

        // create a container for each repo
        var thePlace = document.createElement("div");
        thePlace.classList = "list";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = whereToList;

        // append to container
        thePlace.appendChild(titleEl);

        // append container to the dom
        placesEl.appendChild(thePlace);
      }


    });
  });

}
var placesToSee2 = function () {



  var opentripUrl = ("http://api.opentripmap.com/0.1/en/places/bbox?lon_min=" + lowerLng + "&lat_min=" + lowerLat + "&lon_max=" + higherLng + "&lat_max=" + higherLat + "&kinds=" + activity + "&format=geojson&apikey=" + apiOpenTrip + "&limit=10");

  fetch(opentripUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

   

      console.log(startLat, startLng);


      for (var i = 0; i < data.features.length; i++) {
        // format repo name
        var whereToList = data.features[i].properties.name
        console.log(whereToList);

        // create a container for each repo
        var thePlace2 = document.createElement("div");
        thePlace2.classList = "list2";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = whereToList;

        // append to container
        thePlace2.appendChild(titleEl);

        // append container to the dom
        placesEl2.appendChild(thePlace2);
      }


    });
  });
}

var placesToSee3 = function () {



  var opentripUrl = ("http://api.opentripmap.com/0.1/en/places/bbox?lon_min=" + lowerLng + "&lat_min=" + lowerLat + "&lon_max=" + higherLng + "&lat_max=" + higherLat + "&kinds=" + activity + "&format=geojson&apikey=" + apiOpenTrip + "&limit=10");

  fetch(opentripUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

 
      console.log(startLat, startLng);


      for (var i = 0; i < data.features.length; i++) {
        // format repo name
        var whereToList = data.features[i].properties.name
        console.log(whereToList);

        // create a container for each repo
        var thePlace3 = document.createElement("div");
        thePlace3.classList = "list3";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = whereToList;

        // append to container
        thePlace3.appendChild(titleEl);

        // append container to the dom
        placesEl3.appendChild(thePlace3);
      }


    });
  });
}

// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.querySelectorAll("input[type=checkbox][name=things-input]");
let thingsToSee = []




//Use Array.forEach to add an event listener to each checkbox.
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    thingsToSee =
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unch/ecked checkboxes.
        .map(i => i.value)
    // Use Array.map to extract only the checkbox values from the array of objects.

    console.log(thingsToSee)


    if (thingsToSee === "attractions") {
      activity = "amusements"
    } else {
      activity = " "
    }
    


    if (thingsToSee === "hotels") {
      activity = "accomodations"

    } else {
      activity = " "
    }

    if (thingsToSee == "dining") {
      activity = "foods"

    } else {
      activity = " "
    }

  })

});




$("#clear-history").bind("click", (function () {

  localStorage.clear();
}));

