const API_KEY = '490dc5b5ed517caf6e439cf7522f5c83';

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('fetched weather', data);
      const weather = document.querySelector('#weather > span:first-child');
      const city = document.querySelector('#weather > span:last-child');
      city.innerText = `@ ${data.name}`;
      weather.innerText = `${data.main.temp}℃ ${data.weather[0].main}`;
    });
}
function onGeoError(error) {
  console.error(error);
}

window.navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);