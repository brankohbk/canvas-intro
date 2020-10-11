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
    this.ancho = ancho;
    this.alto = alto;
    this.color = color;
    this.aceleracion = 0.05;
    this.speedY = getRandomInt(1, 7);
    this.speedX = getRandomInt(1, 7);

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
class Pared {
  constructor(x, y, ancho, alto,) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.color = "black";

    this.checkColission = function (otherObj) {
      // Colisiones horizontales
      if (otherObj.x + otherObj.ancho >= this.x &&  //Borde derecho contra MI borde izquierdo
        otherObj.x <= this.x + this.ancho &&       //Borde izquierdo contra MI borde derecho
        otherObj.y <= this.y + this.alto &&        //Verificar el alto (permitir que pase por abajo) 
        otherObj.y + otherObj.alto >= y            //Verificar el alto (permitir que pase por arriba)
      ) {
        otherObj.speedX *= -1;
      }


      // Colisiones verticales
      if (otherObj.y <= this.y + this.alto &&       //Borde superior contra mi borde inferior
        otherObj.y + otherObj.alto >= this.y &&    //Borde inferior contra mi borde superior
        otherObj.x <= this.x + this.ancho &&       //Verificar el ancho (permitir que pase por la derecha)
        otherObj.x + otherObj.ancho >= this.x     //Verificar el ancho (permitir que pase por la izquierda)        
      ) {
        otherObj.speedY *= -1;
        // otherObj.speedX *= -1;

      }


    }

    this.draw = function () {
      // Dibujar este objeto
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    };

  }
}

// let pared = new Pared(canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200)
let pared = new Pared(canvas.width / 2, 80, 60, 60)

let rojo = new Rectangulo(0, 0, 57, 37, "red")
let verde = new Rectangulo(canvas.width - 60, 340, 30, 30, "#94d1be")
let rectangulos = [rojo, verde]


function crearRectangulos(cantidad) {
  let i = 1;
  while (i <= cantidad) {
    let x = getRandomInt(0, canvas.width);
    let y = getRandomInt(0, canvas.height);
    let ancho = getRandomInt(20, 60);
    let alto = getRandomInt(20, 60);
    let color = `hsl(${getRandomInt(1, 360)}, 100%, 50%`;
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
  pared.draw();
  rectangulos.forEach(rectangulo => {
    rectangulo.draw();
    pared.checkColission(rectangulo);
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
