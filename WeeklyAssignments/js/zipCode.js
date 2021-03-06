function myZipFunction(x) {

    var weatherobject = new XMLHttpRequest();
    var zip = x;

    var protocol = "";
    if (location.protocol !== 'https:') {
        protocol = "http:";
    } else {
        protocol = "https:";
    }

    weatherobject.open('GET', protocol + '//api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=bcaeef7f3f256798406a93ab87aa490d&units=imperial', true);



    weatherobject.send();

    weatherobject.onload = function () {
        var weatherInfo = JSON.parse(weatherobject.responseText);
        console.log(weatherInfo);

        document.getElementById('place').innerHTML = weatherInfo.name;
        document.getElementById('stat').innerHTML = weatherInfo.weather[0].description;
        document.getElementById('temp').innerHTML = weatherInfo.main.temp;
        document.getElementById('temph').innerHTML = weatherInfo.main.temp_max;
        document.getElementById('templ').innerHTML = weatherInfo.main.temp_min;
        document.getElementById('wind').innerHTML = weatherInfo.wind.speed;

        var iconcode = weatherInfo.weather[0].icon;
        var icon_path = protocol + "//openweathermap.org/img/w/" + iconcode + ".png";
        document.getElementById('weather_icon').src = icon_path;
        
        windChill(weatherInfo.wind.speed , weatherInfo.main.temp_max , weatherInfo.main.temp_min);
    }

}

function hideZip() {
    document.getElementById("weather").classList.add('hide');
}

function indexZip() {
    var zip = document.getElementById('zip').value;

    if (zip == null || zip == undefined || zip == "" || zip.length != 5) {
        alert("invalid zip code!\nplease enter a 5 digit zip code and try again!");
    } else {
        document.getElementById("weather").classList.remove('hide');
        myZipFunction(zip);
    }
}

function windChill(wind, high, low) {
    // INPUT VARIABLES
    var ws = parseFloat(wind); //Wind Speed
    var th = parseFloat(high); //Air Temparature
    var tl = parseFloat(low); //Air Temparature

    // MATH PORTION
    var t = (th + tl) / 2;
    var s = Math.pow(ws, 0.16);
    var f = 35.74 + (0.6215 * t - 35.75 * s) + (0.4275 * t * s); //Wind Chill Factor Formula

    document.getElementById("windChill").innerHTML = Math.round(f * 10) / 10 + '°F';
}

var pName = document.getElementById('pagename').innerHTML;

if (pName == "Greenville Weather") {
    myZipFunction("63944");
} else if (pName == "Franklin Weather") {
    myZipFunction("65250");
} else if (pName == "Springfield Weather") {
    myZipFunction("65802");
}
