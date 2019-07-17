/* 
bitString Prototype
Jeff Gordon and Maya Keren
Advisors: Aatish Bhatia and Dan Trueman
7/16/19
*/

// p5 sketch for waveform
function sketch(parent) {
    return function( p ) {
        
        let canvas; // canvas
        let period; // sets the period of the wave on the screen
        let waveforms; // array of waveforms to be graphed
        let numOscs = parent.data.spectrum.length; // number of oscs in harmonic spectrum (16)
        let waveAmps; // changes amplitude based on user input
        let fMultArray = [numOscs]; // array of frequency multipliers starting w/ 1 (fundamental)

        p.setup = function() {
            p.noLoop(); // draw loop not in use

            // intialize variables
            canvas = p.createCanvas(800, 250);
            canvas.parent(parent.$el);
            period = canvas.width/(2 * Math.PI)
            waveforms = [];
            waveAmps = [];
            p.populateArrays();
            p.initializeWaveforms();
            p.drawWaves();
        };

        // changes sketch when data is changed
        p.dataChanged = function(s, oldS) {
            p.background(255);
            p.populateArrays();
            p.initializeWaveforms();
            p.drawWaves();
          };

        // fills amp and fmult array
        p.populateArrays = function() {
            for (let i = 0; i < numOscs; i++) {
                waveAmps[i] = parseFloat(parent.data.spectrum[i].amp);
                fMultArray[i] = parseFloat(parent.data.spectrum[i].fMult);
              }
            waveAmps = p.mapWaveAmps(waveAmps); // amplitudes of waves, for testing
        };

        // pushes all waves onto waveform array
        p.initializeWaveforms = function() {
        for (let i = 0; i < numOscs; i++) {
            let wave = []; // wave y-val array

            // populate wave arrays if amplitude is greater than zero
            if (waveAmps[i] != 0) {
            for (let j = 0; j < canvas.width; j = j + 1) {
                wave[j] = waveAmps[i] * p.sin(j * fMultArray[i] / (period)) + canvas.height/2;
                }
            waveforms.push(wave);
                }
            }
        };

        // draws composite wave depending on amplitude of harmonics
        p.drawWaves = function() {
        p.strokeWeight(5)
        p.stroke(127, 212, 195);
            
        for (let j = 0; j < canvas.width; j = j + 1) {
            
            let compositeYVal = 0;
            for (let i = 0; i < waveforms.length; i++) {
                compositeYVal += waveforms[i][j];
            }

            compositeYVal /= waveforms.length;
            
            p.point(j, compositeYVal);
            }
        };

        // converts between 0-1 scale amplitude and p5 drawing dimensions
        p.mapWaveAmps = function(ampArray) {
            let newAmps = [];
            for (let i = 0; i < ampArray.length; i++) {
                newAmps[i] = p.map(ampArray[i], 0, 1, 0, canvas.height/2);
            }
            return newAmps;
        };
    };
}