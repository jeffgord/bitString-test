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
    let oldMute = parent.data.spectrum.mute; // old mute data (FOR NOW...)

    p.setup = function() {
      p.noLoop(); // draw loop not in use

      // initialize oscs array with empty oscs
    	for (let i = 0; i < numOscs; i++) {
        let osc = new p5.Oscillator();
      	osc.setType('sine');
        oscArray.push(osc);
      }

      p.populateSpectrumArrays();
      p.updateOscs();
    };

    // update the sketch only when data changes
    // BY USING data AND oldData THIS COULD BE EVEN MORE EFFICIENT???
    p.dataChanged = function(s, oldS) {
      p.populateSpectrumArrays();
      p.updateOscs();

      if (s.mute != oldMute)
        p.mute();

      // update old mute
      oldMute = s.mute;
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
