
function sketch(parent) {
  return function( p )
    { // p could be any variable name

    let osc; // simple oscillator
    let amp = 0.5; // start with amp of 0.5
    let currentFreq;
    let prevFreq;
    let canvas; // canvas

    // start osc
    p.startOsc = function() {
      osc.start();
      console.log("is anything happening");
    };

    p.setup = function() {
      canvas = p.createCanvas(400, 400);
      canvas.parent(parent.$el);

      currentFreq = parent.data.freq;
      prevFreq = currentFreq;

      osc = new p5.Oscillator();
      osc.start();
      osc.setType('sine');
      osc.freq(currentFreq);
      osc.amp(amp);
      console.log(osc);
      // start osc when mouse over canvas
      //canvas.mouseOver(p.startOsc);

    };

    p.draw = function() {
      // change background color based on freq
      p.background(p.map(currentFreq, 200, 600, 0, 255));
      currentFreq = parent.data.freq;
      if (currentFreq !== prevFreq) {
        console.log('please set osc to ' + currentFreq);
        //osc.freq(currentFreq);
        //osc.freqNode.value = currentFreq;
        console.log(osc.frequency);
        prevFreq = currentFreq;
      }
      //osc.f = freq;
      //console.log(osc.f);
      //console.log(osc);
      //osc.amp(0.1);
      //osc.freq(freq,0.01);
      //p.setFreq(osc, freq);
      //console.log('the frequency is now ' + freq);
    };
  };
}