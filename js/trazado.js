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
let canvas = document.getElementById("trazado") ;
let ctx = canvas.getContext("2d");
canvas.height = window.innerHeight * 0.5;
canvas.width = window.innerWidth * 0.7;

// Definir la clase Rectangulo para instanciar objetos.
class Rectangulo {
  constructor(x, y, ancho, alto, color) {
    // Propiedades
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.color = color;
    this.aceleracion = 0.05;
    this.speedY = getRandomInt(1,7);
    this.speedX = getRandomInt(1,7);

    // Metodos  
    this.checkBorders = function () {
      // Al chocar con un borde, cambiar la dirección.
      if (this.y + this.alto > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
      if (this.x + this.ancho > canvas.width || this.x < 0) {
        this.speedX *= -1;
      }

      // Al cambiar el tamaño del canvas con resizeCanvas(), 
      // verificar que no quede afuera del mismo.
      if (this.y + this.alto > canvas.height) {
        this.y = canvas.height - this.alto;
      }
      if (this.y < 0) {
        this.y = 0;
      }

      if (this.x + this.ancho > canvas.width) {
        this.x = canvas.width - this.ancho;
      }
      if (this.x < 0) {
        this.x = 0;
      }

    };
    this.newPosition = function () {
      // Calcular la nueva posición en base a la velocidad del objeto.
      this.y += this.speedY;
      this.x += this.speedX;
    };
    this.draw = function () {
      // Dibujar este objeto
      this.checkBorders();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.ancho, this.alto);
      this.newPosition();
    };

  }
}



let rectangulos = []
let rojo = new Rectangulo(0, 0, 57, 37, "red")
let verde = new Rectangulo(0, 340, 30, 30, "#94d1be")


function crearRectangulos(cantidad) {
  let i = 1;
  while (i <= cantidad) {
    let x = getRandomInt(0,canvas.width) ;
    let y = getRandomInt(0,canvas.height);
    let ancho = getRandomInt(20,60);
    let alto = getRandomInt(20,60);
    let color = `hsl(${getRandomInt(1,360)}, 100%, 50%`
    rectangulos.push(new Rectangulo(x, y, ancho, alto, color))
    i++
  }
}


function update() {
  //Limpiar el canvas y volver a dibujar los rectángulos. 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangulos.forEach(rectangulo => rectangulo.draw())
}

function resizeCanvas() {
  // Redimensionar el canvas para que mantenga la proporción con respecto a la ventana.
  canvas.height = window.innerHeight * 0.5;
  canvas.width = window.innerWidth * 0.7;
}
window.addEventListener("resize", resizeCanvas);

// Iniciar la animación.
// Se llama a la funcion update() 60 veces en 1000 milisegundos.
const interval = setInterval(update, 1000 / 60);
