// Función auxiliar.

// Convertir grados en radianes.
function degToRad(deg) {
  return deg * Math.PI / 180;
}

// Obtener un número aleatorio entre 2 números.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Referenciar el elemento <canvas> y definir contexto y dimensiones.
let canvas = document.getElementById("animacion");
let ctx = canvas.getContext("2d");
canvas.height = window.innerHeight * 0.6;
canvas.width = window.innerWidth * 0.7;
let degs = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "red";
  ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(degToRad(degs));
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  ctx.fillStyle = "purple";
  ctx.fillRect(canvas.width / 2 - 90, canvas.height / 2 - 90, 180, 180);
  // tengo que volver a la posicion y rotacion orignal
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-1 * degToRad(degs));
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  degs++

  requestAnimationFrame(draw)
}
draw()
// setInterval(draw, 30)
