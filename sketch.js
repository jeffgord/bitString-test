
function sketch(parent) {
  return function( p ) { // p could be any variable name

    let osc; // simple oscillator
    let amp = 0.5; // start with amp of 0.5
    let freq;
    let canvas; // canvas

    p.setup = function() {
      canvas = p.createCanvas(400, 400);
      canvas.parent(parent.$el);

      freq = parent.data.freq;

      osc = new p5.Oscillator();
      osc.setType('sine');
      osc.freq(freq);
      osc.amp(amp);

      // start osc
    p.startOsc = function() {
      osc.start();
      console.log("is anything happening");
    };
        
    // start osc when mouse over canvas
    canvas.mouseOver(p.startOsc);

  };

    p.draw = function() {
      // change background color based on freq
      p.background(p.map(freq, 200, 2000, 0, 255)); 
    };
  };
}