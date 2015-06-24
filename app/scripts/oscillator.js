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
    function Oscillator(type, freq, voices, phase) {
        /* Lets create a sharable audio context */
        this.audioCtx = new window.AudioContext();
        this.gainNode = this.audioCtx.createGain();
        this.voiceCount = voices || 1;
        this.oscillators = [];
        this.gainNode.gain.value = 0.05;
        this.phase = 0 || phase;
        this.octive = 0;
        console.log(freq);

        /* in order to do some maths with the sound later on we need get the speed of a single cycle */
        /* Lets divide 1 second by the number of herts to find out how long 1 cycle would take */
        this.cycle = (1 / freq);
        console.log('this cycle is ' + this.cycle);

        /* loop through and create oscilators */
        for (var i = 0; i < this.voiceCount; i++) {
            this.oscillators[i] = this.audioCtx.createOscillator();
            this.oscillators[i].type = (type || 'sine');
            this.oscillators[i].frequency.value = (freq || 500);
            /* (hopefully) connect all oscillators to the same gain */
            this.oscillators[i].connect(this.gainNode);
        }

        /* The gain needs to connect to the audio destination */
        this.gainNode.connect(this.audioCtx.destination);
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
    *   take the amount of cents it currently has and increase it by 1200
    *   This should increase it by an Octave
    *
    */
    proto.increaseOctave = function() {
        /* loop through and start oscilators */
        for (var i = 0; i < this.voiceCount; i++) {
            this.oscillators[i].detune.value = this.oscillators[i].detune.value + 1200;
        }
    };


    /**
    * Do the opposite of increaseOctave
    */
    proto.increaseOctave = function() {
        /* loop through and start oscilators */
        for (var i = 0; i < this.voiceCount; i++) {
            this.oscillators[i].detune.value = this.oscillators[i].detune.value + 1200;
        }
    };

    /***
    * Set the Cent value of the Oscilator
    */
    proto.setCents = function(cents) {
        /* loop through and start oscilators */
        for (var i = 0; i < this.voiceCount; i++) {
            this.oscillators[i].detune.value = cents;
        }
    };

    /**
     * Adust the frequency of the sounds during play
     *
     * @param {Number} freq The frequency to change to
     * @return {object} this
     */
    proto.setFreq = function(freq) {
        /* loop through and start oscilators */
        for (var i = 0; i < this.voiceCount; i++) {
            this.oscillators[i].frequency.value = freq;
        }
    };

    /**
     * This will start the synth
     *
     * @param {Number} type This will be the type of sound generated, for example "sine", "sawtooth", by default its a "sine"
     * @return {object} this
     */
    proto.start = function(time) {
        /* loop through and start oscilators */
        var currentCycle = this.cycle / this.voiceCount;
        for (var i = 0; i < this.voiceCount; i++) {
            if (this.phase) {
                this.oscillators[i].start(currentCycle);
            } else {
                this.oscillators[i].start(0);
            }
            /* length of a current cycle, plus half a cycle */
            currentCycle = currentCycle + (this.cycle / this.voiceCount);
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
