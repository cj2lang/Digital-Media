let synth1 = new Tone.PolySynth(Tone.Synth);
let synth2 = new Tone.PolySynth(Tone.DuoSynth);
let bend = new Tone.PitchShift();

let notes= {
  'a' : "C4",
  'w' : "C#4",
  's' : "D4",
  'e' : "D#4",
  'd' : "E4",
  'f' : "F4",
  't' : "F#4",
  'g' : "G4",
  'y' : "G#4",
  'h' : "A4",
  'u' : "A#4",
  'j' : "B4",
  'k' : "C5"
}

bend.pitch = 0;
synth1.connect(bend);
synth2.connect(bend);
bend.toDestination();

function setup() {
  createCanvas(400, 400);

  select = createSelect();
  select.position(150, 180);
  select.option('Simple Synth');
  select.option('Duo Synth');
  select.selected('Simple Synth');

  pitchSlider = createSlider(-12, 12, 0, 0.1);
  pitchSlider.position (120, 120);
  pitchSlider.mouseMoved(() => bend.pitch = pitchSlider.value());
}

function keyPressed (){
  if(select.selected() == 'Simple Synth'){
    let playNotes = notes[key];
    synth1.triggerAttackRelease(playNotes, 0.3);
  }else if(select.selected() == 'Duo Synth'){
    let playNotes = notes[key];
    synth2.triggerAttackRelease(playNotes, 0.3);
  }
}

function draw() {
  background(220);
  text("Play A-K for Naturals", 150, 150);
  text("Play W,E,T,Y,U for Sharps", 150, 170);
}
