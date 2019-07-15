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
    let fMultArray = [numOscs]; // array of frequency multipliers starting w/ 1 (fundamental)
    let ampArray = [numOscs]; // array of amplitudes starting w/ fundamental
    let currentFreq = parent.data.fundamental; // fundamental frequency
    let canvas; // canvas

    p.setup = function() {
      p.noLoop(); // draw loop not in use

     	// sketch settings
     	canvas = p.createCanvas(400, 400);
     	canvas.parent(parent.$el);
      p.noStroke();
      p.fill(127, 212, 195); // bars are torquoise

      p.populateSpectrumArrays();
      p.updateSketch();

    };

    // update the sketch only when data changes
    // BY USING data AND oldData THIS COULD BE EVEN MORE EFFICIENT???
    p.dataChanged = function(s, oldS) {
      p.populateSpectrumArrays();
      p.updateSketch();
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

    p.updateSketch = function() {
      // refresh window
      p.background(255);

      // create spectrogram
      for (let i = 0; i < numOscs; i++) {
        var x = p.map(currentFreq * fMultArray[i], currentFreq, currentFreq * fMultArray[numOscs - 1], 0, canvas.width);
        var y = p.map(ampArray[i], 0, 1, 0, canvas.height);
        //let barwidth = ((fMultArray[numOscs - 1]) * currentFreq - currentFreq) / (numOscs);
        //barWidth = p.map(barwidth, 0, barwidth, 0, canvas.width);
        p.rect(x, canvas.height - y, 10, y, 20, 20, 0, 0);
        // (fMultArray[numOscs - 1] - currentFreq) / numOscs
      }
    };

  };
}
