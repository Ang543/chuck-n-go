const jokeEl = document.getElementById('.jokeP')
const fromEl = document.getElementById('from')
const toEl = document.getElementById('to')
let apiMq = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY";
let apiOpenTrip = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816";
var attractEl = document.querySelector("#attract");
var scenicEL = document.querySelector("#scenic")
var hotelEl = document.querySelector("#hotel")
var dineEL = document.querySelector("#dine")
var entEl = document.querySelector("#ent")
var modeChoice = document.querySelector('input[name="modes"]:checked').value;
var thingsToSee = [];

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
  modeChoice = document.querySelector('input[name="modes"]:checked').value;
  console.log(modeChoice);
});

//capture user input for to and from
//angelo

//capture user input for things they want to see
//hannah
$("#getDirections").on("click", function() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  //adds checkbox value to global var array thingsToSee
  for (var checkbox of checkboxes){
      thingsToSee.push(checkbox.value);
  }
  console.log(thingsToSee);
});

//call Mq to get route using user inputs
//dennis

// default map layer
let map = L.map('map', {
  layers: MQ.mapLayer(),
  center: [35.791188, -78.636755],
  zoom: 12
});
  

  function runDirection(start, end) {
      
      // recreating new map layer after removal
      map = L.map('map', {
          layers: MQ.mapLayer(),
          center: [35.791188, -78.636755],
          zoom: 12
      });
      
      var dir = MQ.routing.directions();

      dir.route({
          locations: [
              start,
              end
          ]
      });
  

      CustomRouteLayer = MQ.Routing.RouteLayer.extend({
          createStartMarker: (location) => {
              var custom_icon;
              var marker;

              custom_icon = L.icon({
                  iconUrl: 'img/red.png',
                  iconSize: [20, 29],
                  iconAnchor: [10, 29],
                  popupAnchor: [0, -29]
              });

              marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

              return marker;
          },

          createEndMarker: (location) => {
              var custom_icon;
              var marker;

              custom_icon = L.icon({
                  iconUrl: 'img/blue.png',
                  iconSize: [20, 29],
                  iconAnchor: [10, 29],
                  popupAnchor: [0, -29]
              });

              marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

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

  // delete current map layer
  map.remove();

  // getting form data
  start = document.getElementById("start").value;
  end = document.getElementById("destination").value;

  // run directions function
  runDirection(start, end);

  // reset form
  document.getElementById("form").reset();
}

// asign the form to form variable
const form = document.getElementById('form');

// call the submitForm() function when submitting the form
form.addEventListener('button', submitForm);

//call opentrip to get attractions along route
var getMapObject = function () {
  var response = ("http://api.opentripmap.com/0.1/en/places/bbox?lon_min=38.364285&lat_min=59.855685&lon_max=38.372809&lat_max=59.859052&kinds=museums&format=geojson&apikey=" + apiOpenKey);
  fetch(response).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};



getMapObject();

//allow user to save a trip
//angelo


//future problem-- what if user changes input