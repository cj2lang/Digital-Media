let connectButton;
let port;
let ledState = false;

function setup() {
  createCanvas(400, 400);
  port = new p5.WebSerial();
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);
}

function draw() {
  background(220);
  fill(0);  // Black color for text
  textSize(20);
  textAlign(CENTER, CENTER);
  if (ledState) {
    text("LED is ON", width / 2, height / 2);
  } else {
    text("LED is OFF", width / 2, height / 2);
  }
}

function mousePressed() {
  // Toggle the state of the LED on mouse press
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {  // Check if within canvas
    ledState = !ledState;
    if (port.isOpen()) {
      port.write(ledState ? '1' : '0');  // Send command to Arduino
    }
  }
}

function connect() {
  if (!port.opened()) {
    port.open({ baudRate: 9600 });
    port.on('open', () => {
      console.log("Port opened");
      port.write('1'); // Automatically send '1' to turn on LED
    });
  } else {
    port.close();
    console.log("Port closed");
  }
}
