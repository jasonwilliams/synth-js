require(['oscillator'], function(Oscillator) {
    'use strict';
    /* We need sound to head out to the speakers, so set up a final destination */
    var audioCtx = new window.AudioContext(),
        gainNode = audioCtx.createGain();

    gainNode.connect(audioCtx.destination);

    /* Create a new oscillator which is a sine and at 500 hertz */
    var osc1 = new Oscillator('sine', 500);
    osc1.start(1);
    osc1.stop(3);
    console.log('test');
    /* create an outer audioCtx (so this will act as our main mixer) */

    // var audioCtx = new window.AudioContext();
    // var oscillator = audioCtx.createOscillator();
    // var gainNode = audioCtx.createGain();
    // oscillator.connect(gainNode);
    // gainNode.connect(audioCtx.destination);
    // oscillator.type = 'sawtooth';
    // oscillator.frequency.value = 1000;
    // oscillator.onended = function(e) {
    //   console.log('stopped!');
    //   console.log(e);
    // };
    // oscillator.stop(2);
});
