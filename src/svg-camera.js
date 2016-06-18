var React = require('react');

var SvgCamera = React.createClass({
  displayName: 'SvgCamera',
  propTypes: {
    camera: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
      zoom: React.PropTypes.number.isRequired
    })
  },
  render: function render() {
    var viewbox = this.generateViewBox(this.props);
    var style = this.generateStyle();

    return (
      <svg {...this.props} viewBox={viewbox} style={style} ref={this.cacheSize}>
        {this.props.children}
      </svg>
    );
  },
  cacheSize: function cacheSize(svgElement) {
    if (svgElement) {
      var rect = svgElement.getBoundingClientRect();
      this._size = {
        width: rect.width,
        height: rect.height
      };
    } else {
      this._size = null;
    }
  },
  generateStyle: function generateStyle() {
    if (this._size) {
      return null;
    } else {
      return {
        visibility: 'hidden'
      };
    }
  },
  generateViewBox: function generateViewBox(props) {
    var size = this._size;

    if (!size) {
      return null;
    }

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

module.exports = SvgCamera;
