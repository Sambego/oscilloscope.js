'use strict';
/**
 * Author: Sam Bellen
 * Github: https://github.com/Sambego/oscilloscope.js
 * Version: 0.1
 *
 * Visualise an audio-stream with an oscilloscope
 * @param  {string} target  The target container, in this container the oscilloscope will be created.
 * @param  {context} context An audio context containing the audio-stream
 * @return {Oscilliscope} The Oscilloscope object
 */
var Oscilloscope = Oscilloscope || function(target, context) {
    var _drawWave, _bufferLength, _dataArray;

    this.target = document.querySelector(target);

    // Set the dimensions based on the target container
    this.width = this.target.offsetWidth;
    this.height = this.target.offsetHeight;

    // Create the oscilloscopt wave element
    this.wave = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    this.wave.setAttribute('class', 'oscilloscope__wave');

    // Create the oscilloscope svg element
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.svg.setAttribute('class', 'oscilloscope__svg');
    this.svg.appendChild(this.wave);

    // Append the svg element to the target container
    this.target.appendChild(this.svg);

    // Add the audio context or create a new one
    this.audioContext = context || new window.AudioContext();

    // Indicates if the oscilloscope is running
    this.running = false;

    // Is the oscilloscope analyser-node connected to the audio-context' destination
    this.hasAudio = false;

    // Set-up the analyser-node which we're going to use to get the oscillation wave
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 128;
    _bufferLength = this.analyserNode.frequencyBinCount;
    _dataArray = new Uint8Array(_bufferLength);

    /**
     * Draw the oscillation wave
     */
    _drawWave = function() {
        var path = 'M';

        this.analyserNode.getByteTimeDomainData(_dataArray);

        _dataArray.forEach(function(point, i) {
            path += (((this.width + (this.width / _bufferLength))/ _bufferLength) * i) + ' ' + ((this.height / 2) * (point / 128.0)) + ', ';
        }.bind(this));

        this.wave.setAttribute('d', path);

        if (this.running) {
            window.requestAnimationFrame(_drawWave);
        }
    }.bind(this);

    /**
     * Start the oscilloscope
     */
    this.start = function() {
        this.running = true;

        window.requestAnimationFrame(_drawWave);
    }.bind(this);
};

/**
 * Stop the oscilloscope
 */
Oscilloscope.prototype.stop = function() {
    this.running = false;
};

/**
 * Connect the analyser-node to another audio-node
 * @param  {audioNode} node An audio-node to connect to
 */
Oscilloscope.prototype.connect = function(node) {
    this.analyserNode.connect(node);
};

/**
 * Connect the analyser-node to the audio-context' destination
 */
Oscilloscope.prototype.toggleAudio = function() {
    if (!!this.hasAudio) {
        this.analyserNode.disconnect();
    } else {
        this.analyserNode.connect(this.audioContext.destination);
    }

    this.hasAudio = !this.hasAudio;
};
