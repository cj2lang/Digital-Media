let sounds = new Tone.Players({
  'applause': "assets/applause.mp3",
  'arguing': "assets/arguing.mp3",
  'booing': "assets/booing.mp3",
  'laughing': "assets/laughing.mp3",
});

let delAmt = new Tone.FeedbackDelay("8n", 0.5);
let distAmt = new Tone.Distortion(0.5);
let tremAmt = new Tone.Tremolo(9, 0.75);

let button1, button2, button3, button4;
let delaySlider, tremSlider, distSlider, fbSlider;

sounds.connect(delAmt);
delAmt.connect(tremAmt);
tremAmt.connect(distAmt);
distAmt.toDestination();


function setup() {
  createCanvas(400, 400);

  button1 = createButton('Applause');
  button1.position(10, 85);
  button1.mousePressed(() => sounds.player('applause').start());

  button1 = createButton('Arguing');
  button1.position(120, 85);
  button1.mousePressed(() => sounds.player('arguing').start());

  button1 = createButton('Booing');
  button1.position(220, 85);
  button1.mousePressed(() => sounds.player('booing').start());

  button1 = createButton('Laughing');
  button1.position(320, 85);
  button1.mousePressed(() => sounds.player('laughing').start());

  //delay
  delaySlider = createSlider(0, 0.9, 0, 0.05);
  delaySlider.position(200, 120);
  delaySlider.mouseMoved(() => delAmt.delayTime.value = delaySlider.value());

  //feedback
  fbSlider = createSlider(0, 0.9, 0, 0.05);
  fbSlider.position(200, 150);
  fbSlider.mouseMoved(() => delAmt.feedback.value = fbSlider.value());

  //tremolo
  tremSlider = createSlider(0, 1, 0.75, 0.05);
  tremSlider.position(200, 180);
  tremSlider.mouseMoved(() => tremAmt.depth.value = tremSlider.value());

  //distortion
  distSlider = createSlider(0, 0.9, 0, 0.05);
  distSlider.position(200, 210);
  distSlider.mouseMoved(() => distAmt.distortion = distSlider.value());

}

function draw() {
  background(220);
  text("Delay:", 160, 135);
  text("Feedback:", 140, 165);
  text("Tremolo:", 150, 195);
  text("Distortion:", 140, 225);
}
