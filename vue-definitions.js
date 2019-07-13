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

// Sets up the main Vue instance
var bitString = new Vue({
  
  el: '#root',

  data: {

    sound: {

      mute: true,

      fundamental: 432,

      // stores frequency multipliers and amplitude for each harmonic
      spectrum: []
    }
  },

  methods: {
    initSpectrum: function(n) {
      let data = new Array(n);

      for (let i = 0; i < n; i++) {
        data[i] = { fMult: i + 1, amp: 1 };
      }

      return data;
    },

    muteSound: function() {
      this.sound.mute = !this.sound.mute;
    }
  },

  mounted: function() {
    this.sound.spectrum = this.initSpectrum(16);
  }

})