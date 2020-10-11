// Función auxiliar.

// Convertir grados en radianes.
function degToRad(deg) {
  return deg * Math.PI / 180;
}


// Referenciar el elemento <canvas> y definir contexto y dimensiones.
let canvas = document.getElementById("trazado");
let ctx = canvas.getContext("2d");
canvas.height = window.innerHeight * 0.6;
canvas.width = window.innerWidth * 0.7;



function draw() {
  // Texto sólido.
  ctx.fillStyle = "teal";
  ctx.font = "45px Arial";
  ctx.fillText("Esto es un texto sólido.", 150, canvas.height - 145);
  // Texto hueco.
  ctx.strokeStyle = "green";
  ctx.strokeText("Esto es un texto contorneado.", 150, canvas.height - 50);

  // Trazar una línea desde el centro del canvas.
  ctx.strokeStyle = "red";
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(canvas.width / 4, 340);
  ctx.lineWidth = 6;
  ctx.stroke();

  // Dibujar un rectángulo y luego borrar una porción.
  ctx.fillStyle = "#b4d455";
  ctx.fillRect(10, 10, 60, 45);
  ctx.clearRect(15, 15, 30, 20);
  ctx.strokeStyle = "purple";
  ctx.lineWidth = 2;
  ctx.strokeRect(100, 10, 90, 65);

  // Dibujar un triángulo azulado en una ubicación específica.
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

  // Dibujar arcos.
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 60, degToRad(-40), degToRad(40), false);
  ctx.fillStyle = "blue";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(100, 100, 60, 0, degToRad(170), false);
  ctx.stroke();
  ctx.fillStyle = "#FFAA55";
  ctx.fill();


  // Dibujar un curva cuadrática.
  // quadraticCurveTo(cp1x, cp1y, x, y)
  ctx.beginPath();
  ctx.moveTo(canvas.width * 3 / 4, 100);
  // ctx.lineTo(canvas.width * 1 / 3,100);
  // ctx.lineTo(canvas.width * 2 / 3,200);
  ctx.quadraticCurveTo(canvas.width * 1 / 3,100, canvas.width * 2 / 3,200)
  ctx.stroke();



  // Dibujar un curva bezier.
  // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
  ctx.strokeStyle = "green";  
  const puntoInicial = {x:canvas.width * 1 / 3 ,y:canvas.height / 2};
  const puntoControl1 = {x:(canvas.width  / 2) + 25 ,y:100};
  const puntoControl2 = {x:(canvas.width * 2 / 3) + 50 ,y:200};
  const puntoFinal = {x:canvas.width * 3 / 4 ,y:canvas.height / 2};
  ctx.beginPath();
  ctx.moveTo(puntoInicial.x,puntoInicial.y);
  // ctx.lineTo(puntoControl1.x,puntoControl1.y);
  // ctx.lineTo(puntoControl2.x,puntoControl2.y);
  // ctx.lineTo(puntoFinal.x,puntoFinal.y);
  ctx.bezierCurveTo(puntoControl1.x,puntoControl1.y,puntoControl2.x,puntoControl2.y,puntoFinal.x,puntoFinal.y);
  ctx.stroke();
  
  // Dibujo sacado de MDN.
  ctx.beginPath();
  // ctx.strokeStyle="transparent";
  ctx.moveTo(75 + canvas.width / 4, 40 + canvas.height / 2);
  ctx.bezierCurveTo(75 + canvas.width / 4, 37 + canvas.height / 2, 70 + canvas.width / 4, 25 + canvas.height / 2, 50 + canvas.width / 4, 25 + canvas.height / 2);
  ctx.bezierCurveTo(20 + canvas.width / 4, 25 + canvas.height / 2, 20 + canvas.width / 4, 62.5 + canvas.height / 2, 20 + canvas.width / 4, 62.5 + canvas.height / 2);
  ctx.bezierCurveTo(20 + canvas.width / 4, 80 + canvas.height / 2, 40 + canvas.width / 4, 102 + canvas.height / 2, 75 + canvas.width / 4, 120 + canvas.height / 2);
  ctx.bezierCurveTo(110 + canvas.width / 4, 102 + canvas.height / 2, 130 + canvas.width / 4, 80 + canvas.height / 2, 130 + canvas.width / 4, 62.5 + canvas.height / 2);
  ctx.bezierCurveTo(130 + canvas.width / 4, 62.5 + canvas.height / 2, 130 + canvas.width / 4, 25 + canvas.height / 2, 100 + canvas.width / 4, 25 + canvas.height / 2);
  ctx.bezierCurveTo(85 + canvas.width / 4, 25 + canvas.height / 2, 75 + canvas.width / 4, 37 + canvas.height / 2, 75 + canvas.width / 4, 40 + canvas.height / 2);
  ctx.fillStyle = "#ff0000aa";
  ctx.fill();
  // ctx.stroke();

}

draw();

function resizeCanvas() {
  // Redimensionar el canvas para que mantenga la proporción con respecto a la ventana.
  canvas.height = window.innerHeight * 0.6;
  canvas.width = window.innerWidth * 0.7;
  draw();
}
window.addEventListener("resize", resizeCanvas);



// Dibujar lineas con el mouse.
canvas.addEventListener("click", e => { handleClick(e) });

let isDrawing = false;

function handleClick(event) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "gold" ;
  const x = event.offsetX;
  const y = event.offsetY;
  if (isDrawing) {
    canvas.style.cursor = "auto";
    ctx.lineTo(x, y);
    ctx.stroke();
    isDrawing = !isDrawing;
  } else {
    ctx.beginPath();
    canvas.style.cursor = "crosshair";
    ctx.moveTo(x, y);
    isDrawing = !isDrawing;
  }
}

// canvas.addEventListener("mousemove", e => { handleMove(e) });
// function handleMove(event) {
//   if (isDrawing){
//     ctx.clearRect(0,0,canvas.width,canvas.height)
//     const x = event.offsetX;
//     const y = event.offsetY;
//     ctx.lineTo(x, y);
//     ctx.stroke();
//   }  
// }