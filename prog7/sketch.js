let noise = new Tone.Noise("brown");
let filter = new Tone.Filter (100, "lowpass");

let synth = new Tone.MetalSynth();

synth.connect(filter);
filter.toDestination();

function preload(){
  image = loadImage ('assets/tomJerry.png')
}

function setup() {
  createCanvas(400, 400);
  Tone.start();
}

function draw() {
  if (mouseIsPressed ===true){
    background(image);
    synth.triggerAttackRelease("C-2", "1n");
    filter.frequency.value = 10000;

  } else if (mouseIsPressed === false){
    background (240);
    text('Turn volume down', 150, 150)
    text ('press mouse', 150, 200);
    noise.stop();
  }
}
