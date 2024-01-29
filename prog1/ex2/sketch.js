function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(360);
  strokeWeight(0);

  //red circle
  fill(255, 0, 0, 100);
  circle(200, 150, 100);

  //green circle
  fill(0, 255, 0, 100);
  circle(225, 200, 100);

  //blue circle
  fill(0, 0, 255, 100);
  circle(175, 200, 100);

}
