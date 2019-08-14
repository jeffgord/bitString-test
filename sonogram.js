function sketch(parent) {
  return function(p) {

    let canvas;
    let ampArray = [];
    let t = 0;

    p.setup = function() {
      canvas = p.createCanvas(400, 400);
      canvas.parent(parent.$el);
      p.noStroke();
      p.colorMode("rgb", 1);
    }

    p.draw = function() {
      ampArray = fft.analyze();
      ampArray.length = p.ceil(8000 * 1024 / 22000); // best guess for upper frequency bound of 8,000. p5 documentation doesn't describe exact highest frequency of the fft :(
      ampArray.reverse();

      if(!parent.data.mute) {
      
        for (let i = 0; i < ampArray.length; i++) {
          let yPos = p.map(i, 0, ampArray.length, 0, canvas.height);
          p.colorize(ampArray[i]);
          p.rect(t, yPos, 1, canvas.height / ampArray.length);
        }

        t += 0.1;
      }
    }

    // maps color of rect along the color spectrum depending on amplitude
    p.colorize = function(amp) {

      // log scale and avoiding unecessary calculations
      if (amp != 0) {
        amp = p.map(amp, 0, 255, 0, 6);
        //amp = p.map(Math.log(amp + 1), 0, Math.log(256), 0, 6);
      }

      let colorMap;

      if (amp >= 5) {
        colorMap = p.map(amp, 5, 6, 0, 1);
        p.fill(1, 1 - colorMap, 0);
      }
      else if (amp >= 4) {
        colorMap = p.map(amp, 4, 5, 0, 1);
        p.fill(colorMap, 1, 0);
      }
      else if (amp >= 3) {
        colorMap = p.map(amp, 3, 4, 0, 1);
        p.fill(0, 1, 1 - colorMap);
      }
      else if (amp >= 2) {
        colorMap = p.map(amp, 2, 3, 0, 1);
        p.fill(0, colorMap, 1);
      }
      else if (amp >= 1) {
        colorMap = p.map(amp, 1, 2, 0, 1);
        p.fill(1 - colorMap, 0, 1);
      }
      else {
        colorMap = amp;
        p.fill(1, 1 - colorMap, 1);
      }

    }
  }
}