function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  strokeWeight(0);

  //pac-man
  fill(255, 255, 0);
  arc(150, 200, 200, 200, ((5*PI)/4), ((3*PI)/4), PIE);

  //ghost body
  fill(255, 0, 0);
  rect(350, 200, 200, 100);
  arc(450, 200, 200, 200, PI, 0, PIE);

  //eyes
  fill(255, 255, 255);
  circle(400, 200, 60);
  circle(500, 200, 60);

  //pupils
  fill(0, 0, 255);
  circle(400, 200, 40);
  circle(500, 200, 40);

}
