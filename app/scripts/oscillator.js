/* this will be our main oscillator class which handles sound generation */
/* Oscillator will be an abstraction over the Web Audio API's sound generation */
'use strict';
define(function() {
    /**
     * This will be our oscillator class, which represents an oscillator on a typical synth.
     * We will abstract over the Web Audio API and offer multiple voices, because we want
     * this to be a Polyphonic Synthesizer
     *
     * @param {string} type This will be the type of sound generated, for example "sine", "sawtooth", by default its a "sine"
     * @param {Number} freq This will be the frequency that sound will be played at, by default 500 Hertz
     * @param {Number} voices This is a polyphonic synth so we want to be able to play multiple notes at the same time
     * @constructor
     */
    function Oscillator(type, freq, voices) {
        /* Lets create a sharable audio context */
        this.audioCtx = new window.AudioContext();
        this.gain = this.audioCtx.createGain();
        this.voiceCount = voices || 1;
        this.oscillators = [];

        /* loop through and create oscilators */
        for (var i = 0; i < this.voiceCount; i++) {
            this.oscillators[i] = this.audioCtx.createOscillator();
            this.oscillators[i].type = (type || 'sine');
            this.oscillators[i].freq = (freq || 500);
            /* (hopefully) connect all oscillators to the same gain */
            this.oscillators[i].connect(this.gain);
        }

        /* The gain needs to connect to the audio destination */
        this.gain.connect(this.audioCtx.destination);
    }

    /* Easy access to the prototype */
    var proto = Oscillator.prototype;

    /**
     * This will set the type of sound
     *
     * @param {string} type This will be the type of sound generated, for example "sine", "sawtooth", by default its a "sine"
     * @return {object} this
     */
    proto.setType = function(type) {
        this.oscillator.type = type;
        return this;
    };

    /**
     * This will start the synth
     *
     * @param {Number} type This will be the type of sound generated, for example "sine", "sawtooth", by default its a "sine"
     * @return {object} this
     */
    proto.start = function(time) {
        /* loop through and start oscilators */
        for (var i = 0; i < this.voiceCount; i++) {
            this.oscillators[i].start(time);
        }
        return this;
    };

    /**
     * This will end the oscillator
     *
     * @param {Number} type This will be the type of sound generated, for example "sine", "sawtooth", by default its a "sine"
     * @return {object} this
     */
    proto.stop = function(time) {
        /* loop through and stop oscilators */
        for (var i = 0; i < this.voiceCount; i++) {
            this.oscillators[i].stop(time);
        }
        return this;
    };

    return Oscillator;
});
