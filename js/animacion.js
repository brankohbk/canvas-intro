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
let degs = 30;

function draw() {
  // Borrar todo el lienzo.
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Guardar el estado del contexto.
  ctx.save();
  // Dibujar un cuadrado.
  ctx.fillStyle = "red";
  ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200);

  // Mover el lienzo al centro.
  ctx.translate(canvas.width / 2, canvas.height / 2);
  // Rotar el lienzo.
  ctx.rotate(degToRad(degs));

  // Dibujo el segundo cuadrado (rotado)
  ctx.fillStyle = "purple";
  ctx.fillRect(- 90, - 90, 180, 180);

  // Restablecer el estado del contexto.
  ctx.restore();

  // Aumentar los grados de rotación por cada frame.
  degs++;

  requestAnimationFrame(draw);
}

draw();
function resizeCanvas() {
  canvas.width= window.innerWidth * 0.6;
  canvas.height= window.innerHeight * 0.7;
  draw();
}
window.addEventListener("resize",resizeCanvas);
// setInterval(draw, 1000 / 60)