let sprite;
let sprite2;
let sprite3;


function preload() {
  sprite = new Sprite(200, 200, 80, 80);
  sprite.spriteSheet = 'assets/SpelunkyGirl.png';

  sprite2 = new Sprite(100, 100, 80, 80);
  sprite2.spriteSheet = 'assets/SpelunkyGuy.png';

  sprite3 = new Sprite(300, 300, 80, 80);
  sprite3.spriteSheet = 'assets/BlueGuy.png';


  let animations = {
    stand: {row: 0, frames: 1},
    standUp: {row: 6, frames: 1},
    standDown: {row: 5, col: 7, frames: 1},
    walkRight: {row: 0, col: 1, frames: 8},
    walkUp: {row: 5, frames: 6},
    walkDown: {row: 5, col: 6, frames: 6}
  };

  sprite.anis.frameDelay = 6;
  sprite.addAnis(animations);
  sprite.changeAni('walkRight');

  sprite2.anis.frameDelay = 6;
  sprite2.addAnis(animations);
  sprite2.changeAni('walkRight');

  sprite3.anis.frameDelay = 6;
  sprite3.addAnis(animations);
  sprite3.changeAni('walkRight');

  sprite.LastDirection = 'right';
  sprite2.LastDirection = 'right';
  sprite3.LastDirection = 'right';

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  spriteMovement(sprite);
  spriteMovement(sprite2);
  spriteMovement(sprite3);
}

function spriteMovement(){
  if (kb.pressing('d')) {
    walkRight(sprite);
    walkRight(sprite2);
    walkRight(sprite3);
  } else if (kb.pressing('a')) {
    walkLeft(sprite);
    walkLeft(sprite2);
    walkLeft(sprite3);
  } else if(kb.pressing('w')) {
    walkUp(sprite);
    walkUp(sprite2);
    walkUp(sprite3);
  } else if(kb.pressing('s')) {
    walkDown(sprite);
    walkDown(sprite2);
    walkDown(sprite3)
  } else {
    stop(sprite);
    stop(sprite2);
    stop(sprite3);
  }

}

function stop(sprite){
  sprite.vel.x = 0;
  sprite.vel.y = 0;

  switch (sprite.LastDirection) {
    case 'right':
      sprite.changeAni('stand');
      sprite.scale.x = 1;
      break;
    case 'left':
      sprite.changeAni('stand');
      sprite.scale.x = -1;
      break;
    case 'up':
      sprite.changeAni('standUp');
      break;
    case 'down':
      sprite.changeAni('standDown');
      break;
  }
}

function walkRight(sprite) {
  sprite.changeAni('walkRight');
  sprite.vel.x = 1;
  sprite.vel.y = 0;
  sprite.scale.x = 1;
  sprite.LastDirection = 'right';
}

function walkLeft(sprite) {
  sprite.changeAni('walkRight');
  sprite.vel.x = -1;
  sprite.vel.y = 0;
  sprite.scale.x = -1;
  sprite.LastDirection = 'left';
}

function walkUp(sprite) {
  sprite.changeAni('walkUp');
  sprite.vel.x = 0;
  sprite.vel.y = -1;
  sprite.LastDirection = 'up'
}

function walkDown(sprite) {
  sprite.changeAni('walkDown');
  sprite.vel.x = 0;
  sprite.vel.y = 1;
  sprite.LastDirection = 'down';
}
