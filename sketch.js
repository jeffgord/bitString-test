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

    	// set current fundamental frequency
     	currentFreq = parseFloat(parent.data.fundamental);

     	// canvas
     	canvas = p.createCanvas(400, 400);
     	canvas.parent(parent.$el);
     	p.background(p.map(currentFreq, 200, 600, 0, 255));

      	// initialize oscs, put in osc array, and populate amp array
      	for (let i = 0; i < numOscs; i++) {
        	ampArray[i] = parseFloat(parent.data.harmData[i].amp);

        	let osc = new p5.Oscillator();
        	osc.setType('sine');
        	osc.freq(parseFloat(currentFreq * parent.data.harmData[i].fMult));
        	osc.amp(ampArray[i]);
        	oscArray.push(osc);
        }
    };

    // update the sketch only when data changes
    p.dataChanged = function(s, oldS) {
    	currentFreq = parseFloat(s.fundamental);

    	for (let i = 0; i < numOscs; i++) {
    		oscArray[i].amp(parseFloat(s.harmData[i].amp));
    		oscArray[i].freq(currentFreq * s.harmData[i].fMult);
    	}

    	p.background(p.map(currentFreq, 200, 600, 0, 255));
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
