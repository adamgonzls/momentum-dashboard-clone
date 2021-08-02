const pageContainer = document.getElementById('page-container')
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
  .then(res => res.json())
  .then(data => {
    console.log(data.market_data.current_price.usd)
  })
  .catch(err => console.error(err))
