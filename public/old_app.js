const canvas = document.getElementById('canvas');
const socket = io('http://localhost:5000');
const window_width = window.innerWidth - 20;
const window_height = window.innerHeight - 100;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = '#181818';

const genCircle_btn = document.getElementById('genCircle_btn');

function Circle(xpos, ypos, radius, color, circle_obj) {
  if (typeof circle_obj == 'object') {
    this.xpos = circle_obj.xpos;
    this.ypos = circle_obj.ypos;
    this.radius = circle_obj.radius;
    this.color = circle_obj.color;
  } else {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
  }
}

Circle.prototype.draw = (context) => {
  context.beginPath();
  context.arc(this.xpos, this.ypos, this.radius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
};

function createCircle(circle, context) {
  circle.draw(context);
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
    let circles = [];

    for (let i = 0; i < 10; i++) {
      let my_circle = new Circle(
        getRandomInt(50, window_width - 50),
        getRandomInt(50, window_height - 50),
        50,
        colors[getRandomInt(0, 8)]
      );
      circles.push(my_circle);
      circles[i].draw(context);
      console.log(circles[i]);
    }
    socket.emit('genCircle_clicked', circles);
  };
  socket.on('genCircle', (circles_Data) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles_Data.length; i++) {
      console.log(circles_Data[i]);
      // let my_circle = new Circle(null, null, null, null, circles_Data[i]);
      // console.log(typeof circles_Data[i]);
      // my_circle.draw(context);
    }
  });
}
