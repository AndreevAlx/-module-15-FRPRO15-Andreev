const url = 'wss://echo-ws-service.herokuapp.com';

const input = document.querySelector('input');
const btn = document.querySelector('.btn__line');
const btnGeo = document.querySelector('.btn__geoloc');
const chat = document.querySelector('.chat')

let websoket;

function writeToScreenResponse(message) {
  let pre = document.createElement('p');
  pre.innerHTML = message;
  chat.appendChild(pre);
}

function writeToScreenRequest(message) {
  let pre = document.createElement('p');
  pre.innerHTML = message;
  pre.classList.add('requestMessage');
  chat.appendChild(pre);
}

btn.addEventListener('click', () => {
  websoket = new WebSocket(url);
  if (input.value != "") {
    websoket.onopen = function (evt) {
        writeToScreenRequest(`<span style="color: black;">${input.value}</span>`);
        websoket.send(input.value);
        input.value = "";
    }
};
  websoket.onclose = function(evt) {
    writeToScreenResponse(`<span style="color: red;">DISCONNECTED</span>`);
  };
  websoket.onmessage = function(evt) {
    writeToScreenResponse(`<span style="color: black;">${evt.data}</span>`);
  };
  websoket.onerror = function(evt) {
    writeToScreenResponse('<span style="color: red;">ERROR:</span> ' + evt.data);
  };
});

btnGeo.addEventListener('click', () => {
  websoket = new WebSocket(url);
  websoket.onopen = function (evt) {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position;
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        writeToScreenRequest(`<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Ваша геолокация</a>`);
        websoket.send(coords);
      });
    }
  }
});