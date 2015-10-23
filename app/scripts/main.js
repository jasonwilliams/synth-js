require(['oscillator'], function(Oscillator) {
    'use strict';
    /* We need sound to head out to the speakers, so set up a final destination */
    var audioCtx = new window.AudioContext(),
        gainNode = audioCtx.createGain();

    gainNode.connect(audioCtx.destination);

    /* Create a new oscillator which is a sine and at 500 hertz */
    var osc1 = new Oscillator('sine', 210, 1, 0);
    osc1.start(1);
    osc1.stop(10);
    window.osc1 = osc1;

    $('.dial').knob({fgColor: '#9C4059', bgColor: '#38C8EC', width: '50', height: '50', change:function(data) {  osc1.gainNode.gain.value = (data / 100) }});

    /* UI */
    window.centsControl = document.querySelector('#cents');
    centsControl.addEventListener('change', function(data) {
        console.log(this.value);
        osc1.setCents(this.value);
    });

});
