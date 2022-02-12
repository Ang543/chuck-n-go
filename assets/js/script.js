let apiMq = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY"
let apiOpenKey = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816"

var placesEL = ["accomodations","amusement","tourist_facilities","natural","adult"];
var loclatMin = "";
var loclongMin = "";
var desLatMax = "";
var desLongMax = "";



var attractEl = document.querySelector("#attract");
var scenicEL = document.querySelector("#scenic");
var hotelEl = document.querySelector("#hotel");
var dineEL = document.querySelector("#dine");
var entEl = document.querySelector("#ent");


//this function gets attractions data based on radius
var getMapObject = function () {
  var response = ("http://api.opentripmap.com/0.1/en/places/bbox?lon_min=30.364285&lat_min=49.855685&lon_max=38.372809&lat_max=59.859052&kinds=interesting_places&format=geojson&apikey=" + apiOpenKey);
  fetch(response).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};



getMapObject();

//get user location and destination

//set user location as long-min + Lat-min

//set user destinationas long-max + lat-max

//get list of locations 

//display only user selected locations

// attractEl.addEventListener("checkbox",getMapObject)