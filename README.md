# react-svg-camera

React component to zoom and scroll an svg element.

## Install

`npm install react-svg-camera --save`

## Usage

```js
var SvgCamera = require('react-svg-camera');

var camera = {
  // mid point of camera
  x: 50,
  // mid point of camera
  y: 100,
  // amount of zoom, 2 means zooming in by 2x
  zoom: 2
};

ReactDOM.render(
  <SvgCamera camera={camera}>
    {/* svg children here */}
  </SvgCamera>,
  container
);
```

`<SvgCamera>` becomes `<svg>` so children to `SvgCamera` can be any valid `svg`
children.

## License

MIT
