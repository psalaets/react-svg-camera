var test = require('tape');
var React = require('react');
var ReactDOM = require('react-dom');

var SvgCamera = require('../src/svg-camera');

test('renders its children', function(t) {
  var container = setUp();
  t.plan(2);

  var props = defaultProps();
  var componentInstance = ReactDOM.render(
    <SvgCamera {...props}>
      <rect id="foo"/>
    </SvgCamera>,
    container
  );

  var domNode = ReactDOM.findDOMNode(componentInstance);
  var child = domNode.firstChild;

  t.equal(child.tagName, 'rect');
  t.equal(child.id, 'foo');

  tearDown();
});

test('becomes an <svg>', function(t) {
  var container = setUp();
  t.plan(1);

  var props = defaultProps();

  var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

  var domNode = ReactDOM.findDOMNode(componentInstance);

  t.equal(domNode.tagName, 'svg');

  tearDown();
});

test('passes props along to its <svg>', function(t) {
  var container = setUp();
  t.plan(3);

  var props = defaultProps();
  props.width = 200;
  props.height = 100;
  props.className = 'blah';

  var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

  var domNode = ReactDOM.findDOMNode(componentInstance);

  t.equal(domNode.getAttribute('width'), '200');
  t.equal(domNode.getAttribute('height'), '100');
  t.ok(domNode.classList.contains('blah'));

  tearDown();
});

test('can set viewBox for default camera', function(t) {
  var container = setUp();
  t.plan(1);

  var props = defaultProps();
  props.camera.x = 0;
  props.camera.y = 0;
  props.camera.zoom = 1;

  var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

  var domNode = ReactDOM.findDOMNode(componentInstance);

  t.equal(domNode.style.visibility, '');

  tearDown();
});

test('can set viewBox for zoomed in camera', function(t) {
  var container = setUp();
  t.plan(1);

  var props = defaultProps();
  props.camera.x = 0;
  props.camera.y = 0;
  props.camera.zoom = 2;

  var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

  var domNode = ReactDOM.findDOMNode(componentInstance);

  t.equal(domNode.getAttribute('viewBox'), '-50 -25 100 50');

  tearDown();
});

test('can set viewBox for zoomed out camera', function(t) {
  var container = setUp();
  t.plan(1);

  var props = defaultProps();
  props.camera.x = 0;
  props.camera.y = 0;
  props.camera.zoom = 0.5;

  var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

  var domNode = ReactDOM.findDOMNode(componentInstance);

  t.equal(domNode.getAttribute('viewBox'), '-200 -100 400 200');

  tearDown();
});

test('can set viewBox for scrolled camera', function(t) {
  var container = setUp();
  t.plan(1);

  var props = defaultProps();
  props.camera.x = 100;
  props.camera.y = 40;
  props.camera.zoom = 1;

  var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

  var domNode = ReactDOM.findDOMNode(componentInstance);

  t.equal(domNode.getAttribute('viewBox'), '0 -10 200 100');

  tearDown();
});

test('can set viewBox for zoomed and scrolled camera', function(t) {
  var container = setUp();
  t.plan(1);

  var props = defaultProps();
  props.camera.x = 100;
  props.camera.y = 40;
  props.camera.zoom = 2;

  var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

  var domNode = ReactDOM.findDOMNode(componentInstance);

  t.equal(domNode.getAttribute('viewBox'), '50 15 100 50');

  tearDown();
});

function setUp() {
  var container = document.createElement('div');
  container.id = 'container';

  var styles = document.createElement('style');
  styles.innerHTML = '#container {width: 200px; height: 100px;}\nsvg {width: 100%;height: 100%;}';

  document.body.appendChild(styles);
  document.body.appendChild(container);

  return container;
}

function tearDown() {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}

function defaultProps() {
  return {
    camera: {
      x: 0,
      y: 0,
      zoom: 1
    }
  };
}
