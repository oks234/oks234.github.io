const clock = document.querySelector('#clock');

function padClock(clockNumber) {
  return clockNumber.toString().padStart(2, '0');
}

function paintClock() {
  const date = new Date();
  const minutes = padClock(date.getMinutes());
  const hours = padClock(date.getHours());
  clock.innerText = `${hours}:${minutes}`;
}

paintClock();
setInterval(paintClock, 1000);
