const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () =>{
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active")
}))

// Grab Users location

var userLocation = [];
navigator.geolocation.getCurrentPosition(function(position) {
   var lat = position.coords.latitude;
   var lon = position.coords.longitude;
   userLocation.push(lat, lon); 
   locationCode()  
});

function locationCode() {
    localStorage.setItem("tempLocation", userLocation);
    console.log(userLocation);
}

let tempLocation = localStorage.getItem("tempLocation");
let tempLat, tempLong, myLocation;
[tempLat, tempLong] = tempLocation.split(',');
myLocation = [Number(tempLat), Number(tempLong)];

// This is where we put all the locations 

// SAN FRAN
let Marufuku = {
    coords: [37.78509514993245, -122.43200081094805],
    name: "Marufuku Ramen",
    directions: "https://goo.gl/maps/JW3GjCMntPD18nbd9"
};

let De_Young_Museum = {
    coords: [37.77147264832259, -122.4686748908318],
    name: "De Young Museum",
    directions: "https://goo.gl/maps/bWUGzwTBMqP5YKUKA"
};

let Golden_Gate_Park = {
    coords: [37.768818194806535, -122.4858878601697],
    name: "Golden Gate Park",
    directions: "https://goo.gl/maps/wcCnj7JKcXq5oLpP8"
}

let California_Academy_Of_Science = {
    coords: [37.77098407043966, -122.46626636137267],
    name: "California Academy Of Science",
    directions: "https://goo.gl/maps/Uf7BXWSN8jGDyB4P6"
}
let Alcatraz_Island = {
    coords: [37.82718088403103, -122.42269800794098],
    name: "Alcatraz Island",
    directions: "https://goo.gl/maps/EmeU9UTQ3A32oVke6"
}
let The_Wave_Organ = {
    coords: [37.80885375200926, -122.44004516931366],
    name: "The Wave Organ",
    directions: "https://goo.gl/maps/cKmZSrRmpEJ5KS4r8"
}
let China_Beach = {
    coords: [37.78828002728749, -122.49120293677677],
    name: "China Beach",
    directions: "https://goo.gl/maps/RvhVZzDwGhfs5ist8"
}
let Muir_Woods = {
    coords: [37.89173674146478, -122.56858641979417],
    name: "Muir Woods",
    directions: "https://goo.gl/maps/fomDaLffLcA6DVBC8"
}

// SACRAMENTO
let Old_Sacramento = {
    coords: [38.579651339660835, -121.50708749807691],
    name: "Old Sacramento",
    directions: "https://goo.gl/maps/kQbwXjCv8cxSoBpW6"
}
let Journey_To_The_Dumpling = {
    coords: [38.4250586560677, -121.41724898465682],
    name: "Journey To The Dumpling",
    directions: "https://goo.gl/maps/Xdf2b7EqDCoxErCv5"
}


// List of all the places

locations = [Marufuku, De_Young_Museum, Golden_Gate_Park, California_Academy_Of_Science, Alcatraz_Island, The_Wave_Organ,China_Beach,Muir_Woods, Old_Sacramento, Journey_To_The_Dumpling]


// Functions to check what is nearby and to update DOM
function distanceBetween(myLocation, destinationLocation) {
    [myLocationLat, myLocationLong] = myLocation;
    [destinationLat, destinationLong] = destinationLocation;
    lon1 =  myLocationLong * Math.PI / 180;
    lon2 = destinationLong * Math.PI / 180;
    lat1 = myLocationLat * Math.PI / 180;
    lat2 = destinationLat * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.pow(Math.sin(dlon / 2),2);
            
    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    let km = c * r
    let miles = km * 0.621371
    return(miles);
}

let nearBy = [];

for (let i = 0; i < locations.length; i++){
    distance = distanceBetween(myLocation, locations[i].coords);
    distance = distance.toFixed(1);
    if (distance < 30) {
        nearBy.push([distance, locations[i].name, locations[i].directions])
    }
}

for (let i = 0; i < nearBy.length; i++) {
    // location name for id
    let locationName = nearBy[i][1];
    locationName = locationName.replaceAll(' ', '_');

    //create card element in nearby container
    let nearbyContainer = document.getElementById("nearby-container");
    let card = document.createElement("div");
    card.classList.add('card');
    card.setAttribute('id', locationName + '-card');
    nearbyContainer.append(card);

    // add link to card

    let aTag = document.createElement("a");
    aTag.setAttribute('href', nearBy[i][2]);
    aTag.setAttribute('target', '_blank');

    let aTagDiv = document.createElement("div");
    aTagDiv.setAttribute('id', locationName)
    aTagDiv.setAttribute('class', 'card-image')
    aTag.append(aTagDiv);

    card.append(aTag);

    // add card title and content
    let cardTitle = document.createElement("h2");
    let cardTitleText = locationName.replaceAll("_", " ");
    cardTitle.append(cardTitleText);
    card.append(cardTitle);

    let cardContent = document.createElement("p");
    cardContent.innerHTML = nearBy[i][0] + " miles away";
    card.append(cardContent);
}
