const MY_KEY = "88257ea58fdd23d3eda41c6843c0cfe8";

const btn = document.getElementById("btn");
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

btn.addEventListener("click", () => {

    appStart();

})

document.addEventListener("keydown", function (e) {

    if (e.key == "Enter") {
        appStart();
    }


})

const appStart = () => {
    const cityName = document.querySelector("input").value;
    getCurrent(cityName);
    deleteElement();
}

const getCurrent = async (cityName) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${MY_KEY}`
    );

    const data = await response.json();
    changeHTML(data);

}

const changeHTML = (data) => {

    changeDayHTML();
    document.querySelector(".date-container .location").innerHTML = data.name + ", " + data.sys.country;

    document.querySelector(".feels-like").innerHTML = "Feels Like : " + data.main.feels_like + " °C";
    document.querySelector(".temp-max").innerHTML = "Max Temp: " + data.main.temp_max + " °C";
    document.querySelector(".temp-min").innerHTML = "Min Temp: " + data.main.temp_min + " °C";
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + " %";
    document.querySelector(".weather-temp").innerHTML = data.main.temp + " °C";

    changeWeatherIcon(data.weather[0].icon);

    document.querySelector(".weather-desc").innerHTML = data.weather[0].main;
}

const changeWeatherIcon = (weatherType) => {

    document.querySelector("#weather-icon").src = `https://openweathermap.org/img/wn/${weatherType}@2x.png`
}

const changeDayHTML = () => {

    const day = new Date();

    document.querySelector(".day-dayname").innerHTML = days[day.getDay() - 1];
    document.querySelector(".date-dayname").innerHTML = day.toLocaleDateString();
}


const deleteElement = () => {

    document.querySelector("input").value = "";
}
