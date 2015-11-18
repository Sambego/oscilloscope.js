# oscilloscope.js
A small javascript plugin to create an oscilloscope of an audio-context. You can see an example [here](http://sambego.github.io/oscilloscope.js)

## Install
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
    oscillator.start();

// Create an Oscilloscope instance
//   Parameters:
//     - The container in which the oschilloscope gets created
//     - an optional audio-context on which the oscilloscope creates an analyser-node,
//          and can connect to the destination.
//          If no audio-context is specified, a new one will be created created.
var oscilloscope = new Oscilloscope('.js-oscilloscope', audioContext);

// Connect the oscillator-node to the oscilloscope
oscillator.connect(oscilloscope.analyserNode);

// Start the oscilloscope
oscilloscope.start();
```
## API
### Properties
```javascript
Oscilloscope.target // Container

Oscilloscope.width // The oscilloscope' width

Oscilloscope.height // The oscilloscope' height

Oscilloscope.svg // The svg-element in which we draw the oscilloscope

Oscilloscope.wave // The path svg-element which represents the audio wave

Oscilloscope.audioContext // The oscilloscope' audio-context

Oscilloscope.running // Indicates if the oscilloscope is running

Oscilloscope.hasAudio // Indicates if the oscilloscope is connected to the audio-context' destination
```

### Methods
```javascript
/**
 * Start the oscilloscope
 */
Oscilloscope.start();

/**
 * Stop the oscilloscope
 */
Oscilloscope.stop();

/**
 * Connect the analyser-node to another audio-node
 * @param  {audioNode} node An audio-node to connect to
 */
Oscilloscope.connect(audioNode);

/**
 * Connect the analyser-node to the audio-context' destination
 */
Oscilloscope.toggleAudio();
````

## License
Oscilloscope.js is licensed under the [MIT license](http://opensource.org/licenses/MIT).
