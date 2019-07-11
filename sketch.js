/* 
bitString Prototype
Jeff Gordon and Maya Keren
Advisors: Aatish Bhatia and Dan Trueman
7/9/19
*/

// p5 sketch
function sketch(parent) {
  return function( p ) {

    let numOscs = parent.data.harmData.length; // number of oscs in harmonic spectrum (16)
    let oscArray = []; // array of oscillators starting w/ fundamental
    let ampArray = [numOscs]; // array of amplitudes starting w/ fundamental
    let currentFreq; // fundamental frequency
    let canvas; // canvas
    let mute = true; // toggles sound

    p.setup = function() {

     	// sketch settings
     	canvas = p.createCanvas(400, 400);
     	canvas.parent(parent.$el);
      p.noStroke();
      p.fill(127, 212, 195); // rects are green

      	// initialize oscs, put in osc array, and populate amp array
      	for (let i = 0; i < numOscs; i++) {
        	ampArray[i] = parseFloat(parent.data.harmData[i].amp);
        	let osc = new p5.Oscillator();
        	osc.setType('sine');
        	osc.freq(parseFloat(currentFreq * parent.data.harmData[i].fMult));
        	osc.amp(ampArray[i]);
        	oscArray.push(osc);
        }

        let dummy = 0;

        p.initialize(parent.data, dummy);
    };

    // update the sketch only when data changes
    p.dataChanged = function(s, oldS) {
      p.initialize(s, oldS);
    }

    p.initialize = function(s, oldS) {
      // refresh window
      p.background(255);

      // set current fundamental frequency
      currentFreq = parseFloat(s.fundamental);

      for (let i = 0; i < numOscs; i++) {
        let newAmp = parseFloat(s.harmData[i].amp);
        let newMult = parseFloat(s.harmData[i].fMult);

        oscArray[i].amp(newAmp);
        oscArray[i].freq(currentFreq * newMult);

        var x = p.map(currentFreq * newMult, 0, 10000, 0, canvas.width);
        var y = p.map(newAmp, 0, 1, 0, canvas.height);
        p.rect(x, canvas.height-y, 10, y, 20, 20, 0, 0);
      }
    }

    // mute function
    p.keyPressed = function() {

      // keycode m val
      if (p.keyCode === 77) {
        console.log("pressed");
        mute = !mute;

        // toggle sound on and off
        if (!mute) {
        	for (let i = 0; i < numOscs; i++)
            	oscArray[i].start();
        }

        else {
          for (let i = 0; i < numOscs; i++)
            oscArray[i].stop();
        }
      }
    };
  };
}
