/* 
bitString Prototype
Jeff Gordon and Maya Keren
Advisors: Aatish Bhatia and Dan Trueman
7/9/19
*/

function sketch(parent) {
  return function( p )
    {

    let osc; // simple oscillator
    let amp = 0.5; // start with amp of 0.5
    let currentFreq; // current frequency
    let prevFreq; // old frequency
    let canvas; // canvas
    let mute = true; // toggles sound

    p.setup = function() {
      canvas = p.createCanvas(400, 400);
      canvas.parent(parent.$el);

      currentFreq = parent.data.freq;
      prevFreq = currentFreq;

      // create osc
      osc = new p5.Oscillator();
      osc.setType('sine');
      osc.freq(currentFreq);
      osc.amp(amp);
    };

    // mute function
    p.keyPressed = function() {
      // keycode m val
      if (p.keyCode === 77) {
        console.log("pressed");
        mute = !mute;
        // toggle sound on and off
        if (!mute) {
          osc.start();
        }
        else {
          osc.stop();
        }
      }
    };

    p.draw = function() {
      // change background color based on freq
      p.background(p.map(currentFreq, 200, 600, 0, 255));

      // set frequency to user input
      currentFreq = parseFloat(parent.data.freq);
      osc.freq(currentFreq);
    };
  };
}
