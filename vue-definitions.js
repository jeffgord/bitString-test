

// custom keyboard component, credit Aatish Bhatia
Vue.component('key', {

  props: ['note'],

  template: `
  <div :class="note.class" @mousedown="keyPressed" @mouseup="mouseReleased" @mouseleave="mouseLeft"></div>
  `,

  methods: {

    keyPressed: function(event) {


      // save the key that was pressed
      this.keyPressed = event;

      // convert note into proper frequency
      note = this.note.id;
      let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const cFreq = 261.6255653;
      let noteInAnOctave = note.slice(0, -1);
      let octave = parseInt(note.slice(-1));
      let noteIndex = notes.indexOf(noteInAnOctave);
      let myFreq = cFreq * Math.pow(2, noteIndex / 12) * Math.pow(2, octave - 4);

      // emits message to root that key has been clicked, and sends frequency to root methods
      this.$root.$emit("clickedOnKey", myFreq);

      console.log(myFreq);        

      // change key color
      event.target.className = "selected " + event.target.className;
    },

    mouseLeft: function(event) {
      if (event.target.className.substring(0, 9).match("selected ")) {
        this.restoreKeyColor();
      }
    },

    mouseReleased: function(event) {
      if (event.target.className.substring(0, 9) == "selected ") {
        this.restoreKeyColor();
      }
    },

    restoreKeyColor: function() {
      this.keyPressed.target.className = this.keyPressed.target.className.substring(9);
    }
  }
});

Vue.component('keyboard', {

  template: `
  <div id="keyboard-wrapper">
    <div id="keyboard">
      <key v-for="note in notes" :note="note" :key="note.id"></key>
    </div>
  </div>
  `,

  data: function() {
    return {
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
        { class: "key white b", id: "B5" },
      ]
    }
  }

});

// p5-vue sketch component, credit: Aatish Bhatia
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
  props: ['min', 'max', 'step', 'mouseIsPressed', 'value'],

  template: `
    <input type="range" :min="min" :max="max" :step="step" :value="value" @mousedown.prevent @mouseleave="mouseLeft" @mouseenter="mouseEntered" @mousemove="sliderMoved" @click="sliderClicked" @change="sliderChanged"></input>
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

    sliderChanged: function(event) {
      let slider = event.target;
      this.$emit('input', slider.value)
    },

    updateSlider: function(event) {
      let slider = event.target;
      let offset = event.target.getBoundingClientRect().left;

      let x = event.clientX - offset;
      let pos = Math.round(x / slider.step) * slider.step / (slider.clientWidth - 1);

      let value = slider.min + (slider.max - slider.min) * pos;

      if (value < slider.min) {
        value = slider.min;
      } else if (value > slider.max) {
        value = slider.max;
      }

      slider.value = value;
      this.$emit('input', slider.value)
    }
  },

  data: function() {
    return {
      mouseOverElement: false
    }
  }
});

// Sets up the main Vue instance
var bitString = new Vue({

  el: '#root',

  data: {

    mouseIsPressed: false,

    sound: {

      mute: true,

      fundamental: 432,

      // stores frequency multipliers and amplitude for each harmonic
      spectrum: []
    }
  },

  methods: {

    changeFrequency: function(myFreq) {
      this.sound.fundamental = myFreq;
    },

    // custom mouse controls for sliders and keys
    mousePressed: function(event) {
      console.log("pressed");
      this.mouseIsPressed = true;
    },
    mouseReleased: function(event) {
      console.log("released");
      this.mouseIsPressed = false;
    },


    // initializes spectrum
    initSpectrum: function(n) {
      let data = new Array(n);

      for (let i = 0; i < n; i++) {
        data[i] = { fMult: i + 1, amp: 0 };
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
    this.$root.$on("clickedOnKey", (myFreq) => {
      this.changeFrequency(myFreq);
    })
  }
})