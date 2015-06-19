/* this will be our main oscillator class which handles sound generation */
/* Oscillator will be an abstraction over the Web Audio API's sound generation */
'use strict';
define(function() {
    function Oscillator(type, freq) {
        /* Lets create a sharable audio context */
        this.audioCtx = new window.AudioContext();
        this.oscillator = this.audioCtx.createOscillator();
        this.gain = this.audioCtx.createGain();
        /* The type of sound is needed before the audio can start */
        this.type = this.oscillator.type = (type || 'sine');
        this.freq = this.oscillator.frequency.value = (freq || 500);
        /* connect oscillator to gain */
        this.oscillator.connect(this.gain);
        /* The gain needs to connect to the audio destination */
        this.gain.connect(this.audioCtx.destination);
    }

    /* Easy access to the prototype */
    var proto = Oscillator.prototype;

    proto.setType = function(type) {
        this.oscillator.type = type;
        return this;
    };

    /* Start oscillator */
    proto.start = function(time) {
        this.oscillator.start(time);
        return this;
    };

    /* Stop oscillator */
    proto.stop = function(time) {
        this.oscillator.stop(time);
        return this;
    };

    return Oscillator;
});
