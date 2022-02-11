let apiMq = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY";
let apiOpenTrip = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816";

//get chuckjoke from api and display for user for every new trip
//dennis

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



