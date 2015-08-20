var tessel = require('tessel'),
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use(tessel.port['D']);

var state = [0, 0, 1, 0],
    rightToLeft = false,
    soundTriggerLevel = 0.1;

function onSoundTrigger(data) {
    console.log('boom');
    rightToLeft = !rightToLeft;
    ambient.clearSoundTrigger();
    setTimeout(function() {
        ambient.setSoundTrigger(soundTriggerLevel);
    }, 150);
}


ambient.on('ready', function() {
    ambient.setSoundTrigger(soundTriggerLevel);
    ambient.on('sound-trigger', onSoundTrigger);

    tessel.led.forEach(function(elm, i, array) {
        elm.output(state[i]);
    });
    console.log('BOOM clap')
});

ambient.on('error', function(err) {
    console.log(err);
});

setInterval(function() {
    state = state.map(function(elm, i, array) {
        if (rightToLeft)
            return array[(i + 1 + array.length) % array.length];
        else
            return array[(i - 1 + array.length) % array.length];
    });

    tessel.led.forEach(function(elm, i, array) {
        elm.output(state[i]);
    });

}, 75);
