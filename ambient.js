var tessel = require('tessel'),
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use(tessel.port['D']);

function getAmbientData() {
    ambient.getLightLevel(function(err, ldata) {
        if (err) throw err;
        ambient.getSoundLevel(function(err, sdata) {
            if (err) throw err;
            console.log(
                "Light level:", ldata.toFixed(8),
                "\nSound Level:", sdata.toFixed(8)
            );
        });
    });
}

var lightTriggerVal = 0.5,
    soundTriggerVal = 0.1;

ambient.on('ready', function() {
    setInterval(getAmbientData, 500);

    ambient.setLightTrigger(lightTriggerVal);

    ambient.on('light-trigger', function(data) {
        console.log("Our light trigger was hit:", data);
        ambient.clearLightTrigger();
        setTimeout(function() {
            ambient.setLightTrigger(lightTriggerVal);
        }, 1500);
    });

    ambient.setSoundTrigger(soundTriggerVal);

    ambient.on('sound-trigger', function(data) {
        console.log("Something happened with sound: ", data);

        ambient.clearSoundTrigger();

        setTimeout(function() {
            ambient.setSoundTrigger(soundTriggerVal);
        }, 1500);


    });
});

ambient.on('error', function(err) {
    console.log(err);
});
