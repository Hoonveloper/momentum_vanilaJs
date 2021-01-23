const COORDS='coords';
const API_KEYS= "57c85b836f5b98b73877687a3c3ae43e";
const weather = document.querySelector(".js-weather");
function saveCoords(Obj){
    localStorage.setItem(COORDS,JSON.stringify(Obj));

}
function getWeather(lat,lon){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temp=json.main.temp;
        const place= json.name;
        weather.innerText= `${temp} @ ${place} `;
    });
}


function handleGeoSuc(position){
    const latitude=position.coords.latitude;
    const longtitude=position.coords.longitude;
    console.log(position.coords.latitude,position.coords.longitude);
    const coordsObj={
        latitude:latitude,
        longtitude:longtitude
    };
   // console.log(position);
    saveCoords(coordsObj);
    getWeather(latitude,longtitude);
}


function handleGeoErr(){
   // console.log("failure;");
}
function askForCoords(){
    //console.log("ask실행");
    navigator.geolocation.getCurrentPosition(handleGeoSuc,handleGeoErr);

}

function loadCoords(){
    //console.log("loadcoords실행")
    const loadedCoords=localStorage.getItem(COORDS);
    if (loadedCoords===null){
        askForCoords();
    }
    else{
        const parseCoords= JSON.parse(loadedCoords);
        //console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }

}

function init(){
    //console.log("init실행")
    loadCoords();
}

init();