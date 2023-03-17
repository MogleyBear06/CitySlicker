// ~~~ Map Start ~~~ //

var destinationListEl = $('#timeSpentUl')
var formBtn = document.getElementById('formBtn');
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();
const output = document.querySelector('#output')
// Creates the map function, fragile do not touch //
function initMap() {
  const map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 4,
    center: {lat: 40.116386, lng: -101.299591},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  directionsRenderer.setMap(map);
  // Updates the mode of transport //
  document.getElementById("mode").addEventListener("change", () => {
    calcRoute(directionsService, directionsRenderer);
  });
  
  // Button to update locations //
  document.getElementById("formBtn").addEventListener("click", function(event){
    event.preventDefault();
    calcRoute(directionsService, directionsRenderer);
  });
}


// Calculates and display travel distance and time to the output container and the unordered list container, fragile do not touch//
function calcRoute(directionsService, directionsRenderer) {
  let selectedMode = document.getElementById("mode").value;
  let request = {
    origin: document.getElementById('from').value,
    destination: document.getElementById('to').value,
    travelMode: google.maps.TravelMode[selectedMode],
    unitSystem: google.maps.UnitSystem.IMPERIAL
  }
  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      const output = document.querySelector('#output')
      output.innerHTML = "<div> From: " + document.getElementById('from').value + ".<br /> To: " + document.getElementById('to').value + ". <br /> Driving Distance " + result.routes[0].legs[0].distance.text + ".<br /> Duration " + result.routes[0].legs[0].duration.text + ". </div>";
      
      directionsRenderer.setDirections(result);
      var tripInformation = {
        to: document.getElementById('to').value,
        from: document.getElementById('from').value,
        duration: result.routes[0].legs[0].duration.text,
        length: result.routes[0].legs[0].distance.text
      };


      // var destinationTo = document.getElementById('to').value
      // var destinationFrom = document.getElementById('from').value
      // var tripDuration = result.routes[0].legs[0].duration.text
      // var tripLength =  result.routes[0].legs[0].distance.text
      // if (!destinationTo) {
      //   console.log('No destination specified');
      //   return;
      // }
      var destinationListBoxEl = $(
        '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
        );
        destinationListBoxEl.text(tripInformation.from + tripInformation.to + tripInformation.length + tripInformation.duration);
      
        // add delete button to remove destination from list
        destinationListBoxEl.append(
          '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
          );
          // print to the page
          destinationListEl.append(destinationListBoxEl);
    } else {
      directionsRenderer.setDirections({routes: []});
      map.setCenter(center);
      output.innerHTML = "<p>Can't drive there mate.</p>"
    }
  });
}

// Auto Fill //
const input1 = document.getElementById('from');
const input2 = document.getElementById('to');
const autocompleteOptions = {
  fields: ["formatted_address", "geometry", "name"],
  strictBounds: false,
  types: ["geocode", "establishment" ]
}


const autocomplete1 = new google.maps.places.Autocomplete(input1, autocompleteOptions);
const autocomplete2 = new google.maps.places.Autocomplete(input2, autocompleteOptions);

  //This function serves to remove a list item from the unordered list
    function handleRemoveItem(event) {
      // convert button we pressed (`event.target`) to a jQuery DOM object
      var removeBtnClicked = $(event.target);
      // get the parent `<li>` element from the button we pressed and remove it
      removeBtnClicked.parent('li').remove();
    }
    // use event delegation on the `destinationListEL` to listen for click on any element with a class of `delete-item-btn`
    destinationListEl.on('click', '.delete-item-btn', handleRemoveItem);
    
    
    
    // ~~~ Map End ~~~ Recommended Start ~~~ Experimental //
    
    // autocomplete2.addListener('place_changed', searchNearbyPlaces);
    
    // document.getElementById('recommendOptions').onchange = searchNearbyPlaces
    
    // function searchNearbyPlaces() {
      //   document.getElementById('places').innerHTML = ''
      //   // Get the place details from the autocomplete object.
      //   var place = autocomplete2.getPlace();
      //   console.log(place)
      
      //   // Create a map centered at the location entered in the autocomplete field.
      //   map = new google.maps.Map(document.getElementById('googleMap'), {
        //     center: place.geometry.location,
//     zoom: 15
//   });
  
//   // Perform a nearby search for places of type 'store'.
//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch({
//     location: place.geometry.location,
//     radius: '500',
//     type: [document.getElementById('type').value]
//   }, callback);
// }

// function callback(results, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     console.log(results.length)
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }

// function createMarker(place) {
//   console.log(place)
//   var table = document.getElementById("places");
//   var row = table.insertRow();
//   var cell1 = row.insertCell(0);
//   cell1.innerHTML = place.name;
//   if (place.photos) {
//     let photoUrl = place.photos[0].getUrl();
//     let cell2 = row.insertCell(1)
//     cell2.innerHTML = `<img width="300" height="300" src="${photoUrl}"/>`
//   } else {
//     let photoUrl = "https://via.placeholder.com/150"
//     let cell2 = row.insertCell(1)
//     cell2.innerHTML = `<img width="300" height="300" src="${photoUrl}"/>`
//   }
// }

//Starts it all//
window.onload = initMap();