let apiMq = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY"
let apiOpenKey = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816"

var attractEl = document.querySelector("#attract");
var scenicEL = document.querySelector("#scenic")
var hotelEl = document.querySelector("#hotel")
var dineEL = document.querySelector("#dine")
var entEl = document.querySelector("#ent")

var getMapObject = function () {
  var response = ("http://api.opentripmap.com/0.1/en/places/bbox?lon_min=38.364285&lat_min=59.855685&lon_max=38.372809&lat_max=59.859052&kinds=museums&format=geojson&apikey=" + apiOpenKey);
  fetch(response).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};



getMapObject();

//user location = long-min + Lat-min
//user destination = long-max + lat-max