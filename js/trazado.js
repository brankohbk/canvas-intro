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
let canvas = document.getElementById("trazado");
let ctx = canvas.getContext("2d");
canvas.height = window.innerHeight * 0.5;
canvas.width = window.innerWidth * 0.7;



function draw() {
  // Trazar una línea desde el centro del canvas.
  ctx.strokeStyle = "red";
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(120, 340);
  ctx.stroke();

  // Dibujar un triángulo azulado en un aubicación específica.
  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(100, 300);
  ctx.lineTo(150, 300);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "#27a6e5";
  ctx.fill();

  // Dibujar un triángulo anaranjado cerca del azulado.
  ctx.beginPath();
  ctx.moveTo(120, 200);
  ctx.lineTo(170, 200);
  ctx.lineTo(170, 300);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "#fd7e14";
  ctx.fill();

  // Dibujar un arco.
  for(var i=0;i<4;i++){
    for(var j=0;j<3;j++){
      ctx.beginPath();
      var x              = 25+j*50;               // Coordenada x
      var y              = 25+i*50;               // Coordenada y
      var radius         = 20;                    // Radio del arco
      var startAngle     = 0;                     // Punto inicial del círculo
      var endAngle       = Math.PI+(Math.PI*j)/2; // Punto final del círculo
      var anticlockwise  = i%2==0 ? false : true; // Sentido de las manecillas del reloj y contrario a ellas

      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

      if (i>1){
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }


  // Dibujar un curva cuadrática.
  ctx.beginPath();
  ctx.moveTo(75 + canvas.width / 2, 25);
  ctx.quadraticCurveTo(25 + canvas.width / 2, 25, 25 + canvas.width / 2, 62.5);
  ctx.quadraticCurveTo(25 + canvas.width / 2, 100, 50 + canvas.width / 2, 100);
  ctx.quadraticCurveTo(50 + canvas.width / 2, 120, 30 + canvas.width / 2, 125);
  ctx.quadraticCurveTo(60 + canvas.width / 2, 120, 65 + canvas.width / 2, 100);
  ctx.quadraticCurveTo(125 + canvas.width / 2, 100, 125 + canvas.width / 2, 62.5);
  ctx.quadraticCurveTo(125 + canvas.width / 2, 25, 75 + canvas.width / 2, 25);
  ctx.stroke();

  // Dibujar un curva bezier.
  ctx.beginPath();
  ctx.moveTo(75+ canvas.width / 2,40 + canvas.height / 2);
  ctx.bezierCurveTo(75+ canvas.width / 2,37 + canvas.height / 2,70+ canvas.width / 2,25 + canvas.height / 2,50+ canvas.width / 2,25 + canvas.height / 2);
  ctx.bezierCurveTo(20+ canvas.width / 2,25 + canvas.height / 2,20+ canvas.width / 2,62.5 + canvas.height / 2,20+ canvas.width / 2,62.5 + canvas.height / 2);
  ctx.bezierCurveTo(20+ canvas.width / 2,80 + canvas.height / 2,40+ canvas.width / 2,102 + canvas.height / 2,75+ canvas.width / 2,120 + canvas.height / 2);
  ctx.bezierCurveTo(110+ canvas.width / 2,102 + canvas.height / 2,130+ canvas.width / 2,80 + canvas.height / 2,130+ canvas.width / 2,62.5 + canvas.height / 2);
  ctx.bezierCurveTo(130+ canvas.width / 2,62.5 + canvas.height / 2,130+ canvas.width / 2,25 + canvas.height / 2,100+ canvas.width / 2,25 + canvas.height / 2);
  ctx.bezierCurveTo(85+ canvas.width / 2,25 + canvas.height / 2,75+ canvas.width / 2,37 + canvas.height / 2,75+ canvas.width / 2,40 + canvas.height / 2);
  ctx.fill();

  // Dibujar un logo.

}

draw();


function resizeCanvas() {
  // Redimensionar el canvas para que mantenga la proporción con respecto a la ventana.
  canvas.height = window.innerHeight * 0.5;
  canvas.width = window.innerWidth * 0.7;
  draw();
}
window.addEventListener("resize", resizeCanvas);