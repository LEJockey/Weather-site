let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
let date = new Date()
let responseData


//search input:
let search = document.querySelector('.search-about-location .searchLocationInput')

//variables of current day:
let currentDay = document.querySelector('.weather-table .day')
let currentDate = document.querySelector('.weather-table .date')
let currentLocation = document.querySelector('.weather-table .location')
let currentTemp = document.querySelector('.weather-table .num')
let currentIcon = document.querySelector('.weather-table .today-icon img')
let currentDescription = document.querySelector('.weather-table .description')
let currentHumidity = document.querySelector('.weather-table .humidity')
let currentWind = document.querySelector('.weather-table .wind')
let currentCompass = document.querySelector('.weather-table .compass')

//variables of next days:
let nextDaysTable =document.querySelectorAll('.nextDayTable')
let nextDays = document.querySelectorAll('.nextDayTable .next-day')
let nextDates = document.querySelectorAll('.nextDayTable .next-date')
let nextIcons = document.querySelectorAll ('.nextDayTable .next-icon img')
let daysTemp = document.querySelectorAll('.nextDayTable .dayTemp')
let nightsTemp = document.querySelectorAll('.nextDayTable .nightTemp')
let nextDescription = document.querySelectorAll('.nextDayTable .description')

// getting Data of the weather
async function getWeatherData(currentCity = 'Alexandria') {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5d8747cedbf940febfa64241230503&q=${currentCity}&days=3`)
    responseData = await response.json()
    console.log (responseData)
    displaycurrentDay()
    displayNextDays()    
}
getWeatherData()

// Dislpay Current day data:
function displaycurrentDay() {
    currentDay.innerHTML = days[date.getDay()]
    currentDate.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`
    currentLocation.innerHTML = responseData.location.name
    currentTemp.innerHTML = `${responseData.current.temp_c}<sup>o</sup>C`
    currentIcon.src = `https:${responseData.current.condition.icon}`
    currentDescription.innerHTML = responseData.current.condition.text
    currentHumidity.innerHTML = `${responseData.current.humidity} %`
    currentWind.innerHTML = `${responseData.current.wind_kph} km/h`
    currentCompass.innerHTML = `${responseData.current.wind_dir}`
}

// Dsiplay Next days data:
function displayNextDays() {
    for (let i = 0; i < nextDaysTable.length; i++) {
        nextDays[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()]
        nextDates[i].innerHTML = `${new Date(responseData.forecast.forecastday[i+1].date).getDate()} ${months[new Date(responseData.forecast.forecastday[i+1].date).getMonth()]}`
        nextIcons[i].src = `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`
        daysTemp[i].innerHTML = `${responseData.forecast.forecastday[i+1].day.maxtemp_c}<sup>o</sup>C`
        nightsTemp[i].innerHTML = `${responseData.forecast.forecastday[i+1].day.mintemp_c}<sup>o</sup>C`
        nextDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text   
    }
}

// Function to search about city to get it's weather 
search.addEventListener('input', function () {
    currentCity = search.value.trim()
    getWeatherData(currentCity)
})

