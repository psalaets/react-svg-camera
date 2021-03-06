var React = require('react');

module.exports = React.createClass({
  displayName: 'SvgCamera',
  propTypes: {
    camera: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
      zoom: zoomIsNumberGreaterThanZero
    }).isRequired
  },
  componentWillMount: function componentWillMount() {
    if (!this.knowsSize()) {
      // trigger a render in addition to the initial render so svg's size will
      // be known
      this.forceUpdate();
    }
  },
  render: function render() {
    var viewbox = this.generateViewBox(this.props);

    return (
      <svg {...this.props} viewBox={viewbox} ref={this.cacheSize}>
        {this.props.children}
      </svg>
    );
  },
  cacheSize: function cacheSize(svgElement) {
    if (svgElement) {
      var rect = svgElement.getBoundingClientRect();
      this.setSize({
        width: rect.width,
        height: rect.height
      });
    } else {
      this.setSize(null);
    }
  },
  knowsSize: function knowsSize() {
    return !!this._size;
  },
  getSize: function getSize() {
    return this._size;
  },
  setSize: function setSize(size) {
    this._size = size;
  },
  generateViewBox: function generateViewBox(props) {
    if (!this.knowsSize()) {
      return null;
    }

    var size = this.getSize();
    var width = size.width;
    var height = size.height;
    var camera = props.camera;

    // camera x/y is its center so translate by half size to get its
    // top/left point because that's what viewbox uses
    var cameraX = camera.x - width / 2;
    var cameraY = camera.y - height / 2;

    var viewBoxWidth = width / camera.zoom;
    var viewBoxHeight = height / camera.zoom;

    var viewBoxX = cameraX - ((viewBoxWidth - width) / 2);
    var viewBoxY = cameraY - ((viewBoxHeight - height) / 2);

    return viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight;
  }
});

function zoomIsNumberGreaterThanZero(props, propName, componentName) {
  var value = props[propName];

  if (typeof value != 'number' || value <= 0) {
    return new Error(
      'Invalid prop `camera.zoom` supplied to `' + componentName +
      '`, expected `number greater than 0` but was `' + value + '`'
    );
  }
}
