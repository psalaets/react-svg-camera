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

	    return React.createElement(
	      'svg',
	      _extends({}, this.props, { viewBox: viewbox, style: style, ref: this.cacheSize }),
	      this.props.children
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