var tessel = require('tessel')

//console.log("I'm blinking! (Press CtRL + C to stop)");

var state = [0, 0, 1, 0];

tessel.led.forEach(function(elm, i, array) {
    elm.output(state[i]);
});

setInterval(function() {
    state = state.map(function(elm, i, array) {
        return array[(i - 1 + array.length) % array.length];
    });

    tessel.led.forEach(function(elm, i, array) {
        elm.output(state[i]);
    });

}, 250);
