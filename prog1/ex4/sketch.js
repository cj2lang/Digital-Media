function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(240, 100, 50);
  strokeWeight(7);
  stroke(0, 0, 100);

  fill(120, 100, 50);
  circle(200, 200, 200);

  fill(0, 100, 100);
  beginShape();
    vertex(200, 100);
    vertex(224, 168);
    vertex(295, 169);
    vertex(238, 212);
    vertex(259, 281);
    vertex(200, 240);
    vertex(141, 281);
    vertex(162, 212);
    vertex(105, 169);
    vertex(176, 168);
  endShape(CLOSE);
}
