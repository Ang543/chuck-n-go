let apiMq = "XZSAH1ikLn8zpZjUGzEFqnthzNyKVjIY"
let apiOpenKey = "5ae2e3f221c38a28845f05b604ac0aedf17596d60d10c95865fde816"

var getMapObject = function () {
  var response = ("http://api.opentripmap.com/0.1/en/places/bbox?lon_min=38.364285&lat_min=59.855685&lon_max=38.372809&lat_max=59.859052&kinds=museums&format=geojson&apikey=" + apiOpenKey);
  fetch(response).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};



getMapObject();