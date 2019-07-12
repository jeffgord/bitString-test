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
    let fMultArray = [numOscs]; // array of frequency multipliers starting w/ 1 (fundamental)
    let ampArray = [numOscs]; // array of amplitudes starting w/ fundamental
    let currentFreq = parent.data.fundamental; // fundamental frequency
    let canvas; // canvas
    let mute = true; // toggles sound

    p.setup = function() {

     	// sketch settings
     	canvas = p.createCanvas(400, 400);
     	canvas.parent(parent.$el);
      p.noStroke();
      p.fill(127, 212, 195); // rects are green

      	// initialize oscs and arrays
      	for (let i = 0; i < numOscs; i++) {
          p.populateArrays(i);

        	// populate osc array
          let osc = new p5.Oscillator();
        	osc.setType('sine');
        	osc.freq(currentFreq * fMultArray[i]);
        	osc.amp(ampArray[i]);
        	oscArray.push(osc);
        }

        p.initialize();
    };

    // update the sketch only when data changes
    p.dataChanged = function(s, oldS) {
      p.initialize();
    }

    p.populateArrays = function(i) {
      // populate amp and frequency multiplier arrays
      ampArray[i] = parseFloat(parent.data.harmData[i].amp);
      fMultArray[i] = parseFloat(parent.data.harmData[i].fMult);
    }

    p.initialize = function() {
      // refresh window
      p.background(255);

      // set current fundamental frequency
      currentFreq = parseFloat(parent.data.fundamental);

      for (let i = 0; i < numOscs; i++) {
        p.populateArrays(i);

        let newAmp = ampArray[i];
        let newFMult = fMultArray[i];

        oscArray[i].amp(newAmp);
        oscArray[i].freq(currentFreq * newFMult);

        var x = p.map(currentFreq * newFMult, 0, 10000, 0, canvas.width);
        var y = p.map(newAmp, 0, 1, 0, canvas.height);
        p.rect(x, canvas.height - y, 10, y, 20, 20, 0, 0);
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
