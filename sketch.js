/* 
bitString Prototype
Jeff Gordon and Maya Keren
Advisors: Aatish Bhatia and Dan Trueman
7/9/19
*/

// p5 sketch
function sketch(parent) {
  return function( p ) {

    let numOscs = parent.data.spectrum.length; // number of oscs in harmonic spectrum (16)
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
      p.fill(127, 212, 195); // bars are torquoise
      p.noLoop(); // draw loop not in use

      // initialize oscs array with empty oscs
    	for (let i = 0; i < numOscs; i++) {
        let osc = new p5.Oscillator();
      	osc.setType('sine');
        oscArray.push(osc);
      }

      p.populateSpectrumArrays();
      p.updateOscs();
      p.updateSketch();

    };

    // update the sketch only when data changes
    // BY USING data AND oldData THIS COULD BE EVEN MORE EFFICIENT
    p.dataChanged = function(data, oldData) {
      p.populateSpectrumArrays();
      p.updateOscs();
      p.updateSketch();

      console.log(data);
      console.log(oldData);
      if (data.mute != oldData.mute)
       p.mute();
    }

    // populate amp and frequency multiplier arrays
    p.populateSpectrumArrays = function() {
      // set new fundamental frequency
      currentFreq = parseFloat(parent.data.fundamental);

      for (let i = 0; i < numOscs; i++) {
        ampArray[i] = parseFloat(parent.data.spectrum[i].amp);
        fMultArray[i] = parseFloat(parent.data.spectrum[i].fMult);
      }
    }

    // update the amplitude and frequency of all oscillators
    p.updateOscs = function() {
      for (let i = 0; i < numOscs; i++) {
        oscArray[i].amp(ampArray[i]);
        oscArray[i].freq(currentFreq * fMultArray[i]);
      }
    }

    p.updateSketch = function() {
      // refresh window
      p.background(255);

      // create spectrogram
      for (let i = 0; i < numOscs; i++) {
        var x = p.map(currentFreq * fMultArray[i], 0, 10000, 0, canvas.width);
        var y = p.map(ampArray[i], 0, 1, 0, canvas.height);
        p.rect(x, canvas.height - y, 10, y, 20, 20, 0, 0);
      }
    }

    // mute function
    p.mute = function() {

      console.log(parent.data.mute);

      if (parent.data.mute) {
        for (let i = 0; i < numOscs; i++)
          oscArray[i].stop();
      }

      else {
        for (let i = 0; i < numOscs; i++)
          oscArray[i].start();
      }
    };

  };
}
