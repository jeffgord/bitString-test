function sketch(parent) {
  return function(p) {

    let canvas;
    let ampArray = [];
    let t = 0;

    p.setup = function() {
      canvas = p.createCanvas(400, 400);
      canvas.parent(parent.$el);
      p.noStroke();
    }

    p.draw = function() {
      ampArray = fft.analyze();
      ampArray.reverse();

      if(!parent.data.mute) {
      
        for (let i = 0; i < ampArray.length; i++) {
          if (ampArray[i] != 0) console.log(ampArray[i]);
          let yPos = p.map(i, 0, 1024, 0, canvas.height);
          p.colorize(ampArray[i]);
          p.rect(t, yPos, 1, canvas.height / ampArray.length);
        }

        t += 0.1;
      }
    }

    // maps color of rect along the color spectrum depending on amplitude
    p.colorize = function(amp) {
      if (amp >= 0 && amp < 51) {
        p.fill (255, amp, 0);
      }
      
      if (amp >= 51 && amp < 102) {
        p.fill (255 - amp, 255, 0);
      }
      
      if (amp >= 153 && amp < 204) {
        p.fill (0, 255, amp);
      }
      
      if (amp >= 204 && amp <= 255) {
        p.fill (0, 255 - amp, 255);
      }
    }
  }
}