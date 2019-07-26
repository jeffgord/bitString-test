function sketch(parent) {
    return function( p ) {

        let canvas;
        let numOscs = parent.data.spectrum.length; // number of partials
        let fMultArray = []; // array of frequency multipliers starting w/ 1 (fundamental)
        let ampArray = []; // array of amplitudes starting w/ fundamental
        let currentFreq; // fundamental frequency
        let waves = []; // array of waves (each storing its own 'y' coordinates)
        let t = 0; // time step

        p.setup = function() {
            // sketch settings
            canvas = p.createCanvas(800, 250);
            canvas.parent(parent.$el);
            p.strokeWeight(5);

            // program always starts muted
            p.mute();
        }

        p.draw = function() {
            p.background(255);

            if (parent.data.mute) {
                p.mute();
            }

            else {
                p.drawWaveform();
            }

        }

        // arrays only need to be refreshed when data changes
        p.dataChanged = function(val, oldVal) {
            p.clearWaves();
            p.populateSpectrumArrays();
            p.createWaves();
        }

        // populate amp and frequency multiplier arrays
        p.populateSpectrumArrays = function() {

          currentFreq = parseFloat(parent.data.fundamental);

          for (let i = 0; i < numOscs; i++) {
            ampArray[i] = parseFloat(parent.data.spectrum[i].amp);
            fMultArray[i] = parseFloat(parent.data.spectrum[i].fMult);
          }
        }

        // builds arrays of amplitudes for each frequency
        p.createWaves = function() {

            // loops through each oscillator
            for (let i = 0; i < numOscs; i++) {

                // holds a 'y' coordinate for each 'x' in the canvas
                let wave = [canvas.width];

                // map the amplitude scaling factor to the height of the canvas
                let amplitude = p.map(ampArray[i], 0, 1, 0, (canvas.height / 2) - 10);

                // loops through all 'x' values
                for (let x = 0; x < canvas.width; x++ ) {
                    wave[x] = amplitude * p.sin(x * fMultArray[i] * Math.PI / canvas.width );
                }

                waves.push(wave);
            }

        }

        // clear contents of wave array
        p.clearWaves = function() {
            waves.length = 0;
        }

        p.drawWaveform = function() {

            let allAmpsZero = true;

            p.beginShape();

            for (let x = 0; x < canvas.width; x++) {
                let yComposite = 0;
                let ampTotal = 0;

                for (let i = 0; i < waves.length; i++) {
                    yComposite += waves[i][x] * Math.sin(fMultArray[i] * t);

                    if (ampArray[i] != 0)
                        allAmpsZero = false;

                    // running total, accounting for edge case of 0 hz
                    if (fMultArray[i] != 0)
                        ampTotal += ampArray[i];
                }

                yComposite /= ampTotal;

                if (allAmpsZero)
                    p.mute();

                p.vertex(x, yComposite + canvas.height / 2);
            }

            p.endShape();

            t += 0.01;
        }

        // when muted, draw a straight line
        p.mute = function() {
            p.stroke(155);
            p.line(0, canvas.height / 2, canvas.width, canvas.height / 2);
            p.stroke(127, 212, 195);
        }

    }
}