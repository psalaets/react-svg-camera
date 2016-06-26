module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);

	function zoomIsNumberGreaterThanZero(props, propName, componentName) {
	  var value = props[propName];

	  if (typeof value != 'number' || value <= 0) {
	    return new Error('Invalid prop `camera.zoom` supplied to `' + componentName + '`, expected `number greater than 0` but was `' + value + '`');
	  }
	}

	var SvgCamera = React.createClass({
	  displayName: 'SvgCamera',
	  propTypes: {
	    camera: React.PropTypes.shape({
	      x: React.PropTypes.number.isRequired,
	      y: React.PropTypes.number.isRequired,
	      zoom: zoomIsNumberGreaterThanZero
	    })
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

	    return React.createElement(
	      'svg',
	      _extends({}, this.props, { viewBox: viewbox, ref: this.cacheSize }),
	      this.props.children
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

	    var viewBoxX = cameraX - (viewBoxWidth - width) / 2;
	    var viewBoxY = cameraY - (viewBoxHeight - height) / 2;

	    return viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight;
	  }
	});

	module.exports = SvgCamera;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ }
/******/ ]);