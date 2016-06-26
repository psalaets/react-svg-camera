var React = require('react');
var ReactDOM = require('react-dom');

var SvgCamera = require('../src/svg-camera');
var main = document.getElementById('main');

var camera = {
  x: 250,
  y: 200,
  zoom: 1
};

function handleXChange(event) {
  camera.x = Number(event.target.value);
  render();
}

function handleYChange(event) {
  camera.y = Number(event.target.value);
  render();
}

function handleZoomChange(event) {
  camera.zoom = Number(event.target.value);
  render();
}

function render() {
  var ui = (
    <div>
      <input type="range" min="0" max="500" step="1" value={camera.x} onChange={handleXChange}/>
      x: {camera.x}

      <input type="range" min="0" max="500" step="1" value={camera.y} onChange={handleYChange}/>
      y: {camera.y}

      <input type="range" min="0.1" max="5" step="0.1" value={camera.zoom} onChange={handleZoomChange}/>
      zoom: {camera.zoom}

      <SvgCamera camera={camera}>
        <circle cx="200" cy="200" r="20" fill="red"/>
        <circle cx="250" cy="200" r="20" fill="green"/>
        <circle cx="300" cy="200" r="20" fill="blue"/>
      </SvgCamera>
    </div>
  );

  ReactDOM.render(ui, main);
}

render();
render();
