let connectButton;
let port;
let currentFloorImage;
let lastFloorImage;
let firstFloor, secondFloor, thirdFloor, fourthFloor, fifthFloor, elevatorDoors;
let transitionDelay = 10000;

let sounds;

function preload() {
  firstFloor = loadImage('assets/images/lobby.jpeg');
  secondFloor = loadImage('assets/images/cubicles.jpeg');
  thirdFloor = loadImage('assets/images/cafeteria.jpeg');
  fourthFloor = loadImage('assets/images/boss-office.jpeg');
  fifthFloor = loadImage('assets/images/penthouse.jpeg');
  elevatorDoors = loadImage('assets/images/elevator-doors.jpg');

  sounds = new Tone.Players({
    'music': "assets/sounds/elevator-music.wav",
    'ding': "assets/sounds/ding.wav",
  }).toDestination();
}

function setup() {
  createCanvas(1920, 1080);
  port = createSerial();
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  currentFloorImage = firstFloor;
  lastFloorImage = null;
}

function draw() {
  background(220);
  checkFloor();
  image(currentFloorImage, 0, 0, width, height);
}

function checkFloor() {
  let floorNum = port.read(1);
  if (floorNum !== lastFloorImage) {
    updateFloor(floorNum);
    lastFloorImage = floorNum;
  }
}

function updateFloor(floorNum) {
  currentFloorImage = elevatorDoors;
  console.log("Elevator Doors");

  Tone.loaded().then(() => {
    sounds.player('music').start();
  });

  setTimeout(function() {
    sounds.player('music').stop();
    switchFloorImage(floorNum);
    sendFloorToArduino(floorNum);
  }, transitionDelay);
}

function switchFloorImage(floorNum) {
  if (floorNum == 1) {
    currentFloorImage = firstFloor;
    console.log("First Floor");
  } else if (floorNum == 2) {
    currentFloorImage = secondFloor;
    console.log("Second Floor");
  } else if (floorNum == 3) {
    currentFloorImage = thirdFloor;
    console.log("Third Floor");
  } else if (floorNum == 4) {
    currentFloorImage = fourthFloor;
    console.log("Fourth Floor");
  } else if (floorNum == 5) {
    currentFloorImage = fifthFloor;
    console.log("Fifth Floor");
  }
  Tone.loaded().then(() => {
    sounds.player('ding').start();
  });
}

function sendFloorToArduino(floorNum) {
  port.write(floorNum + '\n');  // Send the floor number to Arduino
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}
