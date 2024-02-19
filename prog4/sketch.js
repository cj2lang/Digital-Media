let sprite;
let i;
let direction;
let characters = [];
let gameFont;
let gameOver = false;
let timeRemaining = 30;

let animations = {
  stand: {row: 0, frames: 1},
  walkRight: {row: 0, col: 1, frames: 8},
  walkUp: {row: 5, frames: 6},
  walkDown: {row: 5, col: 6, frames: 6}
};

function preload() {
  for (i = 0; i <= 20; i++){
    characters.push(new Character(random(400), random(400), 80, 80, 'assets/SpelunkyGuy.png', animations));
  }

  gameFont = loadFont("assets/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(200);
  textFont(gameFont);

  if(gameOver){
    gameDone();
  }else{
    playing();
  }
}

function playing(){
  textSize(16);
  text("Score: 0", 20, 20);
  text("Time remaining: " + ceil(timeRemaining), width - 300, 20);

  characters.forEach((character) => {
    if (character.stepCounter === undefined) {
      character.stepCounter = 0;
      character.maxSteps = floor(random(30, 200));
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
    }else if ((character.sprite.y - (character.sprite.height/4)) < 0) {
      character.walkDown();
    }

    character.sprite.update();
  })

  timeRemaining -= deltaTime / 1000;
  if(timeRemaining < 0){
    gameOver = true;
  }
}

function gameDone(){
  text("Time Up!", 85, 100);
  text("Final Score: 0", 85, 150);
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
  }

  stop(){
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni('stand');
  }

  walkRight() {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = 1;
  }
  
  walkLeft() {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = -1;
  }
  
  walkUp() {
    this.sprite.changeAni('walkUp');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = -1;
  }
  
  walkDown() {
    this.sprite.changeAni('walkDown');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 1;
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

function reset(){
  characters = [];
  for (i = 0; i <= 20; i++){
    characters.push(new Character(random(400), random(400), 80, 80, 'assets/SpelunkyGuy.png', animations));
  }
}