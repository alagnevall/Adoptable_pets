// Creating map object
var myMap = L.map("map", {
    center: [37.68, -97.33],
    zoom: 5,
    layers: MQ.mapLayer()
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: api_key
  }).addTo(myMap);
  
  // Store API query variables
  var baseURL = "http://localhost:5000/Adoption/1.0.2/animals?";
    
  // Assemble API query URL
  var url = baseURL;
  
  // Grab the data with d3
  d3.json(url, function(response) {
  
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
  
    // Loop through data
    for (var i = 0; i < response.length; i++) {
  
      // Set the data location property to a variable
      var location = response[i].address;
      var city = response[i].city;
      var state = response[i].state;
  
      // Check for location property
      if (location) {
        d3.json(`http://www.mapquestapi.com/geocoding/v1/address?key=${mq_key}&location=${location} ${city} ${state}`, function(address){
            markers.addLayer(L.marker([address.results[0].locations[0].latLng.lat, address.results[0].locations[0].latLng.lng]));
            //   .bindPopup(response[i].address));

        })
        // Add a new marker to the cluster group and bind a pop-up
        // markers.addLayer(MQ.geocode({map: myMap}).search(location));

      }
  
    }
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });
 