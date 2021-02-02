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

Circle.prototype.draw = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.beginPath();
  context.arc(this.xpos, this.ypos, this.radius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
};
