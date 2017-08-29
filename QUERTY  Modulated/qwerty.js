var osc, env, modulator, button, sel, slider;
var freq = 220;
var X = 60;

console.log ("QWERTY Modulated Synth");

function setup() {
    console.log("Setup");

    //Oscilator
    osc = new p5.Oscillator();
    osc.amp(0);
    osc.freq(freq);
    osc.start();

    //Modulator
    modulator = new p5.Oscillator('sine');
    modulator.freq(25);
    modulator.amp(50);
    modulator.start();

    //Add the modulator's output to modulate the carrier's freq
    modulator.disconnect();
    osc.freq(modulator);

    //Instantiate the envelope
    env = new p5.Env();

    //set attackTime, decayTime, sustainTime, releaseTime
    env.setADSR(0.001, 0.3, 0.5, 0.7);
    // set attack level, 
    env.setRange(1, 0);

    //Button Octave UP
    createCanvas(100, 100);
    background(0);
    button = createButton('Oct Up');
    button.position(19, 19);
    button.mousePressed(octUp);
   
    //Button Octave DOWN
    createCanvas(250, 100);
    background(0);
    button = createButton('Oct Down');
    button.position(19, 50);
    button.mousePressed(octDw);
   
    //Drop Down Menu for Oscilator
    textAlign(CENTER);
    background(200);
    sel = createSelect();
    sel.position(19, 80);
    sel.option('sine');
    sel.option('square');
    sel.option('triangle');
    sel.changed(oscChange);

    //Drop Down Menu for Modulator
    textAlign(CENTER);
    background(200);
    sel2 = createSelect();
    sel2.position(150, 50);
    sel2.option('sine');
    sel2.option('square');
    sel2.option('triangle');
    sel2.changed(modChange);

    //Slider for Modulator Frequency
    slider = createSlider(0, 50, 0, 1);
    slider.position(150, 19);
    slider.style('width', '80px');
}

function octUp() {
    X =  X + 12;
    console.log("Octave "+ X);
}

function octDw() {
    X = X - 12;
    console.log("Octave " + X);
}

function oscChange() {
    var osctype = sel.value();
    osc.setType(osctype)
    console.log("Oscilator Wave Form =  "+ osctype);
}

function modChange(){
    var modtype = sel2.value();
    modulator.setType(modtype);
    console.log("Modulator Wave Form = " + modtype);
}

function draw() {
    var val = slider.value();
    modulator.freq(val);
  }

function keyPressed() {
    freq = 0;
    note = "";
    switch(key){
        case 'Q':
        note = "C";
        freq = midiToFreq (X);
        break;
        case '2':
        note = "C#";
        freq = midiToFreq (X+1);
        break;
        case 'W':
        note = "D";
        freq = midiToFreq (X+2);
        break;
        case '3':
        note = "D#";
        freq = midiToFreq (X+3);
        break;
        case 'E':
        note = "E";
        freq = midiToFreq (X+4);
        break;
        case 'R':
        note = "F";
        freq = midiToFreq (X+5);
        break;
        case '5':
        note = "F#";
        freq = midiToFreq (X+6);
        break;
        case 'T':
        note = "G";
        freq = midiToFreq (X+7);
        break;
        case '6':
        note = "G#";
        freq = midiToFreq (X+8);
        break;
        case 'Y':
        note = "A";
        freq = midiToFreq (X+9);
        break;
        case '7':
        note = "A#";
        freq = midiToFreq (X+10);
        break;
        case 'U':
        note = "B";
        freq = midiToFreq (X+11);
        break;
    }
    osc.freq(freq);
    env.triggerAttack(osc);

    console.log("Note " + note + " Freq = " + freq);
}

function keyReleased (){
env.triggerRelease(osc);
}
