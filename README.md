# oscilloscope.js
A small javascript plugin to create an oscilloscope of an audio-context

## install
```
bower install oscilloscope.js
```

## Basic setup
```javascript
// Create an audio-context
var audioContext = new window.AudioContext(),
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 400;

// Create an Oscilloscope instance
var oscilloscope = new Oscilloscope('.js-oscilloscope', audioContext);

// Connect the oscillator-node to the oscilloscope
oscillator.connect(oscilloscope.analyserNode);

// Start the oscilloscope
oscilloscope.start();
```

## License
Oscilloscope.js is licensed under the [MIT license](http://opensource.org/licenses/MIT).
