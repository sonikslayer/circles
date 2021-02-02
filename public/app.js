const canvas = document.getElementById('canvas');

//const socket = io('http://localhost:5000');
const window_width = window.innerWidth - 20;
const window_height = window.innerHeight - 100;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = '#181818';

const genCircle_btn = document.getElementById('genCircle_btn');
class Circle {
  constructor(xpos, ypos, radius, color, speed, text, circle_obj) {
    if (typeof circle_obj == 'object') {
      this.xpos = circle_obj.xpos;
      this.ypos = circle_obj.ypos;
      this.radius = circle_obj.radius;
      this.color = circle_obj.color;
      this.speed = circle_obj.speed;
      this.text = circle_obj.text;
    } else {
      this.xpos = xpos;
      this.ypos = ypos;
      this.radius = radius;
      this.color = color;

      this.speed = speed;
      this.text = text;
      this.dx = 1 * this.speed;
      this.dy = 1 * this.speed;
    }
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 10;
    context.arc(this.xpos, this.ypos, this.radius, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.fillStyle = this.color;
    context.textAlign = 'center';
    context.textBaseLine = 'middle';
    context.font = '20px Ariel';
    context.fillText(this.text, this.xpos, this.ypos);
    context.closePath();
  }

  update(context) {
    this.draw(context);
    if (this.xpos + this.radius > window_width) {
      this.dx = -this.dx;
    }
    if (this.xpos - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.ypos + this.radius > window_height) {
      this.dy = -this.dy;
    }

    if (this.ypos - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.xpos += this.dx;
    this.ypos += this.dy;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
var colors = [
  'red',
  'green',
  'blue',
  'lime',
  'purple',
  'yellow',
  'orange',
  'cyan',
];
if (canvas.getContext) {
  /** @type {CanvasRenderingContext2D} */

  const context = canvas.getContext('2d');
  genCircle_btn.onclick = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let getDistance = (xpos1, ypos1, xpos2, ypos2) => {
      var result = Math.sqrt(
        Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)
      );
      return result;
    };
    var my_circle1 = new Circle(
      getRandomInt(50, window_width - 50),
      getRandomInt(50, window_height - 50),
      50,
      colors[getRandomInt(0, 8)],
      5,
      'A'
    );
    var my_circle2 = new Circle(
      200,
      200,
      100,
      colors[getRandomInt(0, 8)],
      0,
      'B'
    );
    console.log(
      getDistance(
        my_circle1.xpos,
        my_circle1.ypos,
        my_circle2.xpos,
        my_circle2.ypos
      )
    );
    my_circle1.draw(context);
    my_circle2.draw(context);
    let updateCircle = () => {
      requestAnimationFrame(updateCircle);
      context.clearRect(0, 0, canvas.width, canvas.height);
      my_circle1.update(context);
      my_circle2.update(context);
      if (
        getDistance(
          my_circle1.xpos,
          my_circle1.ypos,
          my_circle2.xpos,
          my_circle2.ypos
        ) <
        my_circle1.radius + my_circle2.radius
      ) {
        my_circle2.xpos = getRandomInt(100, window_width - 100);
        my_circle2.ypos = getRandomInt(100, window_height - 100);
      }
    };
    updateCircle();
  };
}
