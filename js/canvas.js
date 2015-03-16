//var draw = function draw () {
//  var canvas = document.getElementById('canvas');
//  if(canvas.getContext) {
//    var ctx = canvas.getContext('2d');
//
//    ctx.beginPath();
//    ctx.moveTo(75,50);
//    ctx.lineTo(100,75);
//    ctx.lineTo(100,25);
//    ctx.fill();
//  }
//};
//
//draw();

//initialize variables
var x = 0,
    y = 0,
    velocity = {x: 9.8, y: 2.4},
    xVal = document.getElementById('x'),
    yVal = document.getElementById('y'),
    updateButton = document.getElementById('update');

//get canvas object and set context
var canvas = document.getElementById('canvas');
if(canvas.getContext) {
  var ctx = canvas.getContext('2d');
}

//start line at initial point
ctx.beginPath();
ctx.moveTo(x, y);

//update variables
var update = function update () {
  if(x >= canvas.width || x < 0) {
    velocity.x *= -1;
  }
  if(y >= canvas.height || y < 0) {
    velocity.y *= -1;
  }
  x += velocity.x;
  y += velocity.y;
}

//draw line
var draw = function draw () {
  ctx.lineTo(x, y);
  ctx.stroke();
};

//logic to loop until variables are updated with page controls
var loop = function () {
  update();
  draw();
  console.log("loop");
};

//start the loop function
var startLoop = setInterval(loop, 10);

//reload the canvas and logic with new inputs
var reload = function () {
  clearInterval(startLoop);
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  x = 0;
  y = 0;
  velocity.x = parseFloat(xVal.value);
  velocity.y = parseFloat(yVal.value);
  startLoop = setInterval(loop, 10);
};

//set event handler for x-axis control
xVal.addEventListener("input", function() {
  var xValText = document.getElementById('xVal');
  xValText.innerHTML = 'x-axis Velocity: ' + parseFloat(xVal.value).toFixed(1);
});

//set event handler for x-axis control
yVal.addEventListener("input", function() {
  var yValText = document.getElementById('yVal');
  yValText.innerHTML = 'y-axis Velocity: ' + parseFloat(yVal.value).toFixed(1);
});

updateButton.addEventListener('click', function() {
  reload();
});
