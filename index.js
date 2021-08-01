console.log('working')

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.getElementById('page-container').style.backgroundImage = `url(${data.urls.full})`
    document.getElementById('image-author').textContent = `📸: ${data.user.first_name} ${data.user.last_name ? data.user.last_name : ''}`
  })
