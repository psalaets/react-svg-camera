# react-svg-camera

React component to zoom and scroll an svg element.

Change a camera object to manipulate the svg's `viewBox`.

## Install

`npm install react-svg-camera --save`

## Usage

```js
var SvgCamera = require('react-svg-camera');

ReactDOM.render(
  <SvgCamera camera={camera}>
    {/* svg children here */}
  </SvgCamera>,
  container
);
```

`<SvgCamera>` becomes `<svg>` so children to `SvgCamera` can be any valid `svg`
children.

### props

#### camera

Required. Object that looks like

```js
{
  // Mid point of camera
  x: 50,
  // Mid point of camera
  y: 100,
  // Amount of zoom, 2 means zooming in by 2x. Must be > 0.
  zoom: 2
}
```

## License

MIT
