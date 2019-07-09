
function sketch(parent) {
  return function( p )
    { // p could be any variable name

    let osc; // simple oscillator
    let amp = 0.5; // start with amp of 0.5
    let currentFreq;
    let prevFreq;
    let canvas; // canvas

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

    };

    p.draw = function() {
      // change background color based on freq
      p.background(p.map(currentFreq, 200, 600, 0, 255));
      currentFreq = parseFloat(parent.data.freq);
      osc.freq(currentFreq);
    };
  };
}