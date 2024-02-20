let sprite;
let i;
let direction;
let characters = [];
let gameFont;
let gameOver = false;
let timeRemaining = 30;
let bugsKilled = 0;
let finalScore = 0;

let animations = {
  stand: {row: 2, frames: 1},
  walkLeft: {row: 1, frames: 4},
  walkUp: {row: 0, frames: 4}
};

function preload() {
  for (i = 0; i <= 20; i++){
    characters.push(new Character(random(600), random(40, 600), 32, 32, 'assets/bugSpriteSheet.png', animations));
  }

  gameFont = loadFont("assets/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(200);
  textFont(gameFont);

  fill(255);
  rect(0, 0, width, 30);

  if(gameOver){
    gameDone();
  }else{
    playing();
  }
}

function playing(){
  fill(0);
  textSize(16);
  text("Bugs Killed: " + bugsKilled, 20, 20);
  text("Time remaining: " + ceil(timeRemaining), width - 300, 20);

  characters.forEach((character) => {
  if(!character.stopped){

    if (character.stepCounter === undefined) {
      character.stepCounter = 0;
      character.maxSteps = floor(random(30, 500));
      character.direction = floor(random(4));
    }
  
    if (character.stepCounter < character.maxSteps) {
      character.stepCounter++;
    } else {
      character.direction = floor(random(4));
      character.stepCounter = 0;
      character.maxSteps = floor(random(10, 30));
    }

    switch(character.direction){
      case 0:
        character.walkRight();
        break;
      case 1:
        character.walkLeft();
        break;
      case 2:
        character.walkUp();
        break;
      case 3:
        character.walkDown();
        break;
      default:
        character.stop();
    }

    if ((character.sprite.x + (character.sprite.width/4)) > width) {
      character.walkLeft();
    }else if ((character.sprite.x - (character.sprite.width/4)) < 0) {
      character.walkRight();
    }else if ((character.sprite.y + (character.sprite.height/4)) > height) {
      character.walkUp();
    }else if ((character.sprite.y - (character.sprite.height/4)) < 40) {
      character.walkDown();
    }
  }

    character.sprite.update();
  })

  timeRemaining -= deltaTime / 1000;
  if(timeRemaining < 0){
    gameOver = true;
  }
}

function gameDone(){
  finalScore = bugsKilled;
  fill(255);
  rect(50, 50, 500, 200);

  fill(0);
  text("Bugs Killed: " + finalScore, 20, 20);
  text("Time remaining: 0", width - 300, 20);
  text("Time Up!", 85, 100);
  text("Bugs Killed: " + finalScore, 85, 150);
  text("Press P to play again!", 85, 200)
}

class Character{
  constructor(x, y, width, height, spriteSheet, animations){
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
  
    this.sprite.anis.frameDelay = 20; //need to add each time it is clicked, frameDelay--
    this.sprite.collider = 'none';
    this.sprite.addAnis(animations);
    this.sprite.changeAni('stand');
    this.stopped = false;
  }

  stop(){
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni('stand');
    this.stopped = true;
  }

  reset(){
    this.sprite.x = random(600);
    this.sprite.y = random(40, 600);
    this.stopped = false;
    this.sprite.changeAni('stand');
    this.sprite.anis.frameDelay = 20;
  }

  speedUp(){
    if(!this.stopped){
      this.sprite.anis.frameDelay--;
    }
  }

  walkRight() {
    this.sprite.changeAni('walkLeft');
    this.sprite.vel.x = 1;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = -1;
  }
  
  walkLeft() {
    this.sprite.changeAni('walkLeft');
    this.sprite.vel.x = -1;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = 1;
  }
  
  walkUp() {
    this.sprite.changeAni('walkUp');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = -1;
  }
  
  walkDown() {
    this.sprite.changeAni('walkUp');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 1;
    this.sprite.scale.y = -1;
  }

  contains(x, y){
    let leftEdge = this.sprite.x - (this.sprite.width / 2);
    let rightEdge = this.sprite.x + (this.sprite.width / 2);
    let topEdge = this.sprite.y - (this.sprite.height / 2);
    let bottomEdge = this.sprite.y + (this.sprite.height / 2);
    let insideX = (x >= leftEdge && x <= rightEdge);
    let insideY = (y >= topEdge && y <= bottomEdge);
    return insideX && insideY;
  }
}

function keyTyped() {
  if(gameOver){
    if(key === 'p'){
      console.log(keyTyped);
      timeRemaining = 30;
      gameOver = false;
      reset();
    }
  }
}

function mousePressed(){
  for(let i = 0; i < characters.length; i++){
    if (characters[i].contains(mouseX, mouseY)){
      characters[i].stop();
      if(!gameOver){
        bugsKilled++;
      }
    }else{
      characters[i].speedUp();
    }
  }
}

function reset(){
  characters.forEach(character => character.reset());
  bugsKilled = 0;
}