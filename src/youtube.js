let player;

// Esta función se llama cuando se carga el iframe de la API de YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'bUWZiVS-lLQ', // ID del video de YouTube
    events: {
      'onReady': onPlayerReady,
    }
  });
}

function onPlayerReady(event) {
  console.log("El reproductor está listo.");
}

function playVideo() {
  player.playVideo();
}

function pauseVideo() {
  player.pauseVideo();
}

function adelantar() {
  const currentTime = player.getCurrentTime();
  player.seekTo(currentTime + 10, true);
}

function retroceder() {
  const currentTime = player.getCurrentTime();
  player.seekTo(currentTime - 10, true);
}
