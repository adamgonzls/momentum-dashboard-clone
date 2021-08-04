const pageContainer = document.getElementById('page-container')
const cryptoInfoContainer = document.getElementById('crypto-info__container')
const weatherInfoContainer = document.getElementById('weather-info__container')
const timeDisplay = document.getElementById('time__display')
const unSplashAPI = 'https://apis.scrimba.com/unsplash/photos/'
const coinGeckoAPI = 'https://api.coingecko.com/api/v3/'
const openWeatherAPI = 'https://apis.scrimba.com/openweathermap/data/2.5/weather'

fetch(`${unSplashAPI}random?orientation=landscape&query=nature`)
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    pageContainer.style.backgroundImage = `url(${data.urls.full})`
    document.getElementById('image-author').textContent = `📸: ${data.user.first_name} ${data.user.last_name ? ' ' + data.user.last_name : ''}`
  })
  .catch(err => {
    console.error(err)
    pageContainer.style.backgroundImage = 'url(https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mjc4NzU2OTI&ixlib=rb-1.2.1&q=85)'
  })

fetch(`${coinGeckoAPI}coins/dogecoin`)
  .then(res => {
    if (!res.ok) {
      cryptoInfoContainer.innerHTML = '<span>Data not available at this time</span>'
      throw Error('Something went wrong')
    }
    return res.json()
  })
  .then(data => {
    cryptoInfoContainer.innerHTML = `
    <div id="crypto-info__details" class="info-row">
      <img class="crypto-info__image" src="${data.image.small}" alt="${data.name}" />
      <span>${data.name}</span>
    </div>
    <ul class="no-bullets">
      <li>🤑: $${data.market_data.current_price.usd}</li>
      <li>⬆️: $${data.market_data.high_24h.usd}</li>
      <li>⬇️: $${data.market_data.low_24h.usd}</li>
    </ul>
    `
  })
  .catch(err => console.error(err))

function displayCurrentTime () {
  const currentTime = new Date().toLocaleTimeString([], { timeStyle: 'short' })
  timeDisplay.textContent = currentTime
}

setInterval(displayCurrentTime)

if (!navigator.geolocation) {
  console.error('Your browser doesn\'t support Geolocation')
}
navigator.geolocation.getCurrentPosition(position => {
  // console.log(position)
  const {
    latitude,
    longitude
  } = position.coords
  fetch(`${openWeatherAPI}?lat=${latitude}&lon=${longitude}&units=imperial`)
    .then(res => {
      if (!res.ok) {
        weatherInfoContainer.innerHTML = '<span>Weather data not available at this time</span>'
        throw Error('Weather data not available')
      }
      return res.json()
    })
    .then(data => {
      console.log(data)
      const weatherDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
      const cityName = data.name
      const tempF = Math.round(data.main.temp)
      const tempC = Math.round((5 / 9) * (tempF - 32))
      weatherInfoContainer.innerHTML = `
      <div class="info-row">
        <img class="weather-info__image" src='http://openweathermap.org/img/wn/${data.weather[0].icon}.png' />
        <span class='text--shadow'>${weatherDescription}</span>
      </div>
      <span class='text--shadow'>${cityName}</span>
      <span class='text--shadow'>${tempF}&#8457;</span>
      <span class='text--shadow'>${tempC}&#8451;</span>`
    })
    .catch(err => console.error(err))
})
// function onSuccess (position) {
//   const {
//     latitude,
//     longitude
//   } = position.coords

//   // message.classList.add('success')
//   console.log(`Your location: (${latitude},${longitude})`)
// }
