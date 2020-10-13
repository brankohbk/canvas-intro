// Función auxiliar.
// Obtener un número aleatorio entre 2 números.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Referenciar el elemento <canvas> y definir contexto y dimensiones.
let canvas = document.getElementById("colisiones");
let ctx = canvas.getContext("2d");
canvas.height = window.innerHeight * 0.6;
canvas.width = window.innerWidth * 0.7;

// Definir la clase Rectangulo para instanciar objetos.
class Rectangulo {
  constructor(x, y, ancho, alto, color) {
    // Propiedades
    this.x = x;
    this.y = y;
    this.width = ancho;
    this.height = alto;
    this.color = color;
    this.speedY = getRandomInt(1, 7);
    this.speedX = getRandomInt(1, 7);

    // Metodos  
    this.checkBorders = function () {
      // Al chocar con un borde, cambiar la dirección.
      if (this.y + this.height > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
      if (this.x + this.width > canvas.width || this.x < 0) {
        this.speedX *= -1;
      }

      // Al cambiar el tamaño del canvas con resizeCanvas(), 
      // verificar que no quede afuera del mismo.
      if (this.y + this.height > canvas.height) {
        this.y = canvas.height - this.height;
      }
      if (this.y < 0) {
        this.y = 0;
      }

      if (this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
      }
      if (this.x < 0) {
        this.x = 0;
      }

    };
    this.checkColission = function (otherObjects) {
      otherObjects.forEach( other => {
        if(other != this){
          const myLeft = this.x ;
          const myRight = this.x + this.width ;
          const myTop = this.y ;
          const myBottom = this.y + this.height ;
          const otherLeft = other.x ;
          const otherRight = other.x + other.width ;
          const otherTop = other.y ;
          const otherBottom = other.y + other.height ;
          let colide = true;
          if(
            myLeft > otherRight ||
            myRight < otherLeft ||
            myTop > otherBottom ||
            myBottom < otherTop
            ){
              colide = false;
            }
            
            if(colide){
              this.speedX *= -1;
              this.speedY *= -1;
              if (this.color === "red" && other.color !== "black") {
                other.color = "red"
              }
          }

        }
      })
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
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.newPosition();
    };
  }
}

let rojo = new Rectangulo(10, 0, 30, 37, "red")
let verde = new Rectangulo(canvas.width - 60, 340, 30, 30, "#94d1be")
let pared = new Rectangulo(canvas.width / 2, 0, 60, 200, "black")
pared.speedX=0;
pared.speedY=0;

let rectangulos = [rojo, verde, pared]


function crearRectangulos(cantidad) {
  let i = 1;
  while (i <= cantidad) {
    let x = getRandomInt(0, canvas.width);
    let y = getRandomInt(0, canvas.height);
    let ancho = getRandomInt(20, 60);
    let alto = getRandomInt(20, 60);
    let color = `hsl(${getRandomInt(0, 360)}, 100%, 50%`;
    rectangulos.push(new Rectangulo(x, y, ancho, alto, color));
    i++;
  }
}

function eliminarRectangulos(cantidad) {
  rectangulos.splice(0, cantidad)
}
function resetearRectangulos() {
  rectangulos = [];
}


function update() {
  //Limpiar el canvas y volver a dibujar los rectángulos. 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangulos.forEach(rectangulo => {
    rectangulo.draw();
    rectangulo.checkColission(rectangulos);
  });
}

function resizeCanvas() {
  // Redimensionar el canvas para que mantenga la proporción con respecto a la ventana.
  canvas.height = window.innerHeight * 0.6;
  canvas.width = window.innerWidth * 0.7;
}
window.addEventListener("resize", resizeCanvas);

// Iniciar la animación.
// Se llama a la funcion update() 60 veces en 1000 milisegundos.
const interval = setInterval(update, 1000 / 60);
