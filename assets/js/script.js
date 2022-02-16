const jokeEl = document.getElementById('.jokeP')
const fromEl = document.getElementById('from')
const toEl = document.getElementById('to')
let apiOpenTrip = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816";
var attractEl = document.querySelector("#attract");
var scenicEL = document.querySelector("#scenic")
var hotelEl = document.querySelector("#hotel")
var dineEL = document.querySelector("#dine")
var entEl = document.querySelector("#ent")
var modeChoice = document.querySelector('input[name="modes"]:checked').value;
var thingsToSee = [];
var whereTo = "";
var activity = "";
var placesEl = document.querySelector("#places-container");
var SearchTerm = document.querySelector("#search-term");


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
  

 
  
  

  //call opentrip to get attractions along route
var getMapObject = function () {
  

  var opentripUrl = ("http://api.opentripmap.com/0.1/en/places/bbox?lon_min=-74.320096&lat_min=40.410167&lon_max=-73.964609&lat_max=40.768952&kinds=" + activity + "&format=geojson&apikey=" + apiOpenTrip + "&limit=10");


  fetch(opentripUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      startLat = data.features[0].geometry.coordinates[0];
      startLong = data.features[0].geometry.coordinates[1];
      whereTo = data.features[0].properties.name;
      // console.log(data.features);
      // console.log(startLat,startLong,whereTo);
      placesToSee(data);

    });
  });

 


     var placesToSee = function (data){
      placesEl.textContent = ";"
    

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

      
    

      // console.log(startLat,startLong,whereTo);

      //
    }
      
 

}

$("#getDirections").on("click", function() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  //adds checkbox value to global var array thingsToSee
  for (var checkbox of checkboxes){
      thingsToSee.push(checkbox.value);
      
  }
  if(thingsToSee == "Attractions"){
    activity = "amusements"
    
  }
  else if(thingsToSee == "hotels"){
    activity = "accomodations"
    
  }
  else if(thingsToSee == "scenic views"){
    activity = "natural"
   
  }
  else if(thingsToSee == "dining"){
    activity = "foods"
    
  }
  else if(thingsToSee == "entertainment"){
    activity = "theatres_and_entertainments"
    
  }
  
  
  getMapObject();
  

});
  


//capture user input for tansport mode
//hannah

// $("#mode").on("click", function() {
//   var mode = document.querySelector('input[name="modes"]:checked').value;
//   console.log(mode);
// });
//capture user input for to and from
//angelo

//start of trip


 

//$("#start").on("click", function() {
  //tripStart = document.querySelector('input[name="text"]:checked').value;
  //console.log(tripStart);
//});

//end of trip

document.getElementById("getDirections").onclick = function(){

  var tripStart = document.getElementById("start").value;
  console.log(tripStart);

  var tripEnd = document.getElementById("destination").value;
  console.log(tripEnd);
}

//$("#destination").on("click", function() {
  //tripEnd = document.querySelector('input[name="text"]:checked').value;
  //console.log(tripEnd);
//});

//capture user input for things they want to see
//hannah


//call Mq to get route using user inputs
//dennis

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
      console.log(dir.route);
  

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

              marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

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
form.addEventListener('submit', submitForm);

