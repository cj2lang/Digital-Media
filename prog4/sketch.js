let sprite;
let i;
let direction;
let characters = [];

function preload() {
  let animations = {
    stand: {row: 0, frames: 1},
    walkRight: {row: 0, col: 1, frames: 8},
    walkUp: {row: 5, frames: 6},
    walkDown: {row: 5, col: 6, frames: 6}
  };

  for (i = 0; i <= 20; i++){
    characters.push(new Character(random(400), random(400), 80, 80, 'assets/SpelunkyGuy.png', animations));
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  characters.forEach((character) => {
    // if (kb.pressing('d')) {
    //   character.walkRight();
    // } else if (kb.pressing('a')) {
    //   character.walkLeft();
    // } else if(kb.pressing('w')) {
    //   character.walkUp();
    // } else if(kb.pressing('s')) {
    //   character.walkDown();
    // } else {
    //   character.stop();
    // }

    direction = floor(random(4));

    switch(direction){
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
}

class Character{
  constructor(x, y, width, height, spriteSheet, animations){
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
  
    this.sprite.anis.frameDelay = 6;
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


function keyTypedOld() {
  switch(key){
    case 'd': 
      walkRight();
      break;
    case'a':
      walkLeft();
      break;
    case 'w':
      walkUp();
      break;
    case 's':
      walkDown();
      break;
  }
}