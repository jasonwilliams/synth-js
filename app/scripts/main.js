console.log('starting oscillator6');
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = 'sawtooth';
oscillator.frequency.value = 1000;
oscillator.onended = function(e) {
    console.log('stopped!');
    console.log(e);
}
oscillator.start(0);
oscillator.stop(3)