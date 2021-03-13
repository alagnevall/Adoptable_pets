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

let selection = "%" 
let animalSelector = d3.select("div.dropdown-menu")
  .selectAll("a")
  .on("click", function(event){
    console.log(d3.select(this).attr("value"))
     selection =d3.select(this).attr("value");
     updatePage();
  })



  // Store API query variables
  let baseURL = "http://localhost:5000/Adoption/1.0.2/animals?";
    
  // Assemble API query URL
  
  // Grab the data with d3
  function updatePage(){
    let url = baseURL + "type=" + selection;
    console.log(url)
    d3.json(url, function(response) {
  
    // Create a new marker cluster group
    let markers = L.markerClusterGroup();
    let photoData = []
    // let petMarker = []
    // myMap.removeLayer(markers);
    var clearPhotoData = d3.select("div.carousel-inner");
    clearPhotoData.selectAll("div").remove()
    
    // Loop through data
    for (var i = 0; i < response.length; i++) {
     
      // Set the data location property to a variable
      var location = response[i].address;
      var city = response[i].city;
      var state = response[i].state;
      var photos = response[i].photo;
      petname = response[i].name;
      var species = response[i].species; 
      if (photos !="none"){
        photoData.push(photos)
      }  
      
      // Check for location property
      if (location) {
        d3.json(`http://www.mapquestapi.com/geocoding/v1/address?key=${mq_key}&location=${location} ${city} ${state}`, function(address){
          markers.addLayer(L.marker([address.results[0].locations[0].latLng.lat, address.results[0].locations[0].latLng.lng])
          .bindPopup(petname));
        })
        
        // Add a new marker to the cluster group and bind a pop-up
        // markers.addLayer(MQ.geocode({map: myMap}).search(location));
        
      }
      
    }
    // console.log(photoData)
    var slides = d3.select("div.carousel-inner")
    .selectAll("img")
    .data(photoData);
    
    slides.enter()
    .append("div")
    .attr("class", "carousel-item")
    .append("img")
    .attr("class", "d-block mx-auto")
    .attr("src", function(d){return d;})
    .attr("width", 200);
    // .attr("height", 50)

    d3.select("div.carousel-item")
      .attr("class", "carousel-item active")
    
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });
}
updatePage();