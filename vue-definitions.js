// p5-vue component, credit: Aatish Bhatia
Vue.component('p5', {

  template: '<div></div>',

  props: ['src','data'],

  methods: {
    // loadScript from https://stackoverflow.com/a/950146
    // loads the p5 javscript code from a file
    loadScript: function (url, callback)
    {
      // Adding the script tag to the head as suggested before
      var head = document.head;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = callback;
      script.onload = callback;

      // Fire the loading
      head.appendChild(script);
    },

    loadSketch: function() {
      this.myp5 = new p5(sketch(this));
    }
  },

  data: function() {
    return {
      myp5: {}
    }
  },

  mounted() {
    this.loadScript(this.src, this.loadSketch);
  },

  watch: {
    data: {
      handler: function(val, oldVal) {
        if(this.myp5.dataChanged) {
          this.myp5.dataChanged(val, oldVal);
        }
      },
      deep: true
    }
  }

})


// custom slider component, credit: Aatish Bhatia
Vue.component('slider',{
  props: ['min', 'max', 'step', 'mouseIsPressed'],

  template: `
    <input type="range" :min="min" :max="max" :step="step" @mousedown.prevent @mouseleave="mouseLeft" @mouseenter="mouseEntered" @mousemove="sliderMoved" @click="sliderClicked"></input>
  `,

  methods: {
    mouseEntered: function(event) {
      this.mouseOverElement = true;
    },

    mouseLeft: function(event) {
      this.mouseOverElement = false;
    },

    sliderMoved: function(event) {
      if (this.mouseIsPressed && this.mouseOverElement) {
        this.updateSlider(event);
      }
    },

    sliderClicked: function(event) {
      this.updateSlider(event);
    },

    updateSlider: function(event) {
      let slider = event.target;
      let bounds = event.target.getBoundingClientRect();
      let x = event.clientX - bounds.left;
      let width = bounds.right - bounds.left - 1;
      slider.value = slider.min + (slider.max - slider.min) * x / width;
      console.log(slider.value);
    }

  },

  data: function() {
    return {
      mouseOverElement: false,
      sliderVal: 0
    }
  }
});


// Sets up the main Vue instance
var bitString = new Vue({
  
  el: '#root',

  data: {

    mouseIsPressed: false,

    notes: [
      { class: "key white c", id: "C3" },
      { class: "key black c_sharp", id: "C#3" },
      { class: "key white d", id: "D3" },
      { class: "key black d_sharp", id: "D#3" },
      { class: "key white e", id: "E3" },
      { class: "key white f", id: "F3" },
      { class: "key black f_sharp", id: "F#3" },
      { class: "key white g", id: "G3" },
      { class: "key black g_sharp", id: "G#3" },
      { class: "key white a", id: "A3" },
      { class: "key black a_sharp", id: "A#3" },
      { class: "key white b", id: "B3" },

      { class: "key white c", id: "C4" },
      { class: "key black c_sharp", id: "C#4" },
      { class: "key white d", id: "D4" },
      { class: "key black d_sharp", id: "D#4" },
      { class: "key white e", id: "E4" },
      { class: "key white f", id: "F4" },
      { class: "key black f_sharp", id: "F#4" },
      { class: "key white g", id: "G4" },
      { class: "key black g_sharp", id: "G#4" },
      { class: "key white a", id: "A4" },
      { class: "key black a_sharp", id: "A#4" },
      { class: "key white b", id: "B4" },

      { class: "key white c", id: "C5" },
      { class: "key black c_sharp", id: "C#5" },
      { class: "key white d", id: "D5" },
      { class: "key black d_sharp", id: "D#5" },
      { class: "key white e", id: "E5" },
      { class: "key white f", id: "F5" },
      { class: "key black f_sharp", id: "F#5" },
      { class: "key white g", id: "G5" },
      { class: "key black g_sharp", id: "G#5" },
      { class: "key white a", id: "A5" },
      { class: "key black a_sharp", id: "A#5" },
      { class: "key white b", id: "B5" }
    ],

    sound: {

      mute: true,

      fundamental: 432,

      // stores frequency multipliers and amplitude for each harmonic
      spectrum: []
    }
  },

  methods: {

    // custom mouse controls for sliders
    mousePressed: function(event) {
      this.mouseIsPressed = true;
    },

    mouseReleased: function(event) {
      this.mouseIsPressed = false;
    },


    // changes fundamental frequency based on keyboard note pressed
    noteToFreq: function(event) {
      console.log("clicked note");
      console.log(event.target, event.target.id, event.target.className);

      let note = event.target.id;
      // somehow we want to add a select class to the target here
      // event.target.className = "changed"; //dont do this

      let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const cFreq = 261.6255653;
      let noteInAnOctave = note.slice(0, -1);
      let octave = parseInt(note.slice(-1));
      let noteIndex = notes.indexOf(noteInAnOctave);
      let myFreq = cFreq * Math.pow(2, noteIndex / 12) * Math.pow(2, octave - 4);
      this.sound.fundamental = myFreq;
    },


    // initializes spectrum
    initSpectrum: function(n) {
      let data = new Array(n);

      for (let i = 0; i < n; i++) {
        data[i] = { fMult: i + 1, amp: 1 };
      }

      return data;
    },

    // toggles sound on and off
    muteSound: function() {
      this.sound.mute = !this.sound.mute;
    },

    // changes mute button label depending on sound on or off
    muteLabel: function(mute) {
      if (mute)
        return "unmute";
      else return "mute";
    }
  },

  mounted: function() {
    this.sound.spectrum = this.initSpectrum(16);
  }

})