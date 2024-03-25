
let selectedColor;
let boxes;
let mouseClicked = false;
let x;
let y;
let sounds = new Tone.Players({
  'piano': "assets/piano.mp4",
  'pencil': "assets/pencil.mp3"
}).toDestination();


function setup() {
  createCanvas(800, 400);
  selectedColor = color('white');

  sounds.player('piano').loop = true;

  Tone.loaded().then(() => {
    sounds.player('piano').start();
  });

  boxes = [
    new Box(5, 5, color('red')),
    new Box(5, 30, color('orange')),
    new Box(5, 55, color('yellow')),
    new Box(5, 80, color('green')),
    new Box(5, 105, color('cyan')),
    new Box(5, 130, color('blue')),
    new Box(5, 155, color('magenta')),
    new Box(5, 180, color('brown')),
    new Box(5, 205, color('white')),
    new Box(5 ,230, color('black'))];
}

function draw() {
  for(let i=0;i < boxes.length;i++) {
    boxes[i].draw();
  }

  fill(selectedColor);
  circle(width-30,30, 20);
  
}

function mousePressed() {
  let isInBox = false;
  for(let i=0;i < boxes.length;i++) {
    if(boxes[i].contains(mouseX,mouseY)) {
      selectedColor = boxes[i].fill;
      isInBox = true;
    }
  }

  if(!isInBox) {
    mouseClicked = true;
    if (sounds.player('pencil').state !== "started") {
      sounds.player('pencil').loop = true;
      sounds.player('pencil').start();
    }
  }
}

function mouseReleased() {
  sounds.player('pencil').stop();
}

function mouseDragged(){
  if (mouseClicked == true){
    x += mouseX - pmouseX;
    y += mouseY - pmouseY;
  }
  noStroke();
  fill(selectedColor);
  ellipse(pmouseX, pmouseY, 30);
  
}

class Box {
  constructor(x,y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw() {
    strokeWeight(3)
    fill(this.fill);
    square(this.x,this.y,20);
  }

  contains(x,y) {
    let insideX = x >= this.x && x <= this.x+20;
    let insideY = y >= this.y && y <= this.y+20;
    return insideX && insideY;
  }
}