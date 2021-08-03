const pageContainer = document.getElementById('page-container')
const cryptoInfoContainer = document.getElementById('crypto-info__container')
const timeDisplay = document.getElementById('time__display')
const unSplashAPI = 'https://apis.scrimba.com/unsplash/photos/'
const coinGeckoAPI = 'https://api.coingecko.com/api/v3/'

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
      cryptoInfo.textContent = 'Data not available at this time'
      throw Error('Something went wrong')
    }
    return res.json()
  })
  .then(data => {
    cryptoInfoContainer.innerHTML = `
    <div id="crypto-info__details" class="crypto-info__row">
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
