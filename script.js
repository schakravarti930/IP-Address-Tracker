
var customIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize:[30,40],
});

var mymap = L.map('map');

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'sk.eyJ1Ijoic2NoYWtyYXZhcnRpOTMwIiwiYSI6ImNrZjByNGNjdDBsbWcycGxudW9jM241ajUifQ.JlXIcXrwuHwBjQbVkciEug'
    }).addTo(mymap);

getCurrentCoord = async() =>{
    const url = 'https://geo.ipify.org/api/v1?apiKey=at_9ar6j3rlGIh0BN7KO7lBBdOilNlmC&ipAddress=';
    const response = await fetch(url).then(resp => resp.json());
    return response;
}
onReload = async() =>{
    const response = await getCurrentCoord();
    const {ip,isp,location} = response;
    const {city,region,country,timezone,lat,lng} = location;

    mymap.setView([lat,lng],12);
    var marker = L.marker([lat,lng], {icon:customIcon}).addTo(mymap);
    const popup = lat + "\n" + lng;
    marker.bindPopup(popup).openPopup();
    document.getElementById("Ip").innerHTML = ip;
    document.getElementById("Location").innerHTML = `${city}, ${region}, ${country}`;
    document.getElementById("Timezone").innerHTML = `UTC ${timezone}`;
    document.getElementById("Isp").innerHTML = isp;
    console.log(popup);
}
onReload();


handleSubmit = async() =>{
    const inp = document.querySelector(".input input").value;
    const Url =`https://geo.ipify.org/api/v1?apiKey=at_9ar6j3rlGIh0BN7KO7lBBdOilNlmC&ipAddress=${inp}`;
    const Response = await fetch(Url).then(resp => resp.json());
    const {ip,isp,location} = Response;
    const {city,region,country,timezone,lat,lng} = location;

    mymap.setView([lat,lng],12);
    var marker = L.marker([lat,lng], {icon:customIcon}).addTo(mymap);
    const popup = lat + "\n" + lng;
    marker.bindPopup(popup).openPopup();
    document.getElementById("Ip").innerHTML = ip;
    document.getElementById("Location").innerHTML = `${city}, ${region}, ${country}`;
    document.getElementById("Timezone").innerHTML = `UTC ${timezone}`;
    document.getElementById("Isp").innerHTML = isp;
    console.log(ip);
}


const button = document.querySelector("#search");
button.addEventListener('click',handleSubmit);