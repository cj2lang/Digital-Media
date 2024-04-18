//Caleb Langley

let port;
let circleX, circleY;
let connectButton;

function setup() {
  port = createSerial();
  createCanvas(400, 400);
  circleX = width / 2;
  circleY = height / 2;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  frameRate(100);
}

function draw() {
  background(220);

  let latest = port.readUntil("\n");
  if (latest.length > 0) {
    let potValue = parseInt(latest.trim());
    circleX = map(potValue, 0, 1023, 0, width);
  }
  noStroke();
  fill('purple');
  rect(0, 0, width / 2, height);
  fill('gold');
  rect(width / 2, 0, width / 2, height);

  if (port.opened() && frameCount % 3 == 0) {
    let pixel = get(circleX, circleY);
    console.log(pixel);
    let message = `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
    port.write(message);
  }

  stroke(0);
  fill(255);
  circle(circleX, circleY, 20);
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}


// Circle seems to randomly jump left and right on the screen. I could not figure it out.
// I tried to use a potentiometer to move the circle left and right.