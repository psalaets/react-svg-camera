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

test('on first render', function(t) {
  t.test('is hidden', function(st) {
    var container = setUp();
    st.plan(1);

    var props = defaultProps();
    var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

    var domNode = ReactDOM.findDOMNode(componentInstance);

    st.equal(domNode.style.visibility, 'hidden');

    tearDown();
  });

  t.test('does not set viewBox', function(st) {
    var container = setUp();
    st.plan(1);

    var props = defaultProps();
    var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

    var domNode = ReactDOM.findDOMNode(componentInstance);

    st.equal(domNode.getAttribute('viewBox'), null);

    tearDown();
  });
});

test('after first render', function(t) {
  t.test('is not hidden', function(st) {
    var container = setUp();
    st.plan(1);

    var props = defaultProps();

    ReactDOM.render(<SvgCamera {...props}/>, container);
    var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

    var domNode = ReactDOM.findDOMNode(componentInstance);

    st.equal(domNode.style.visibility, '');

    tearDown();
  });

  t.test('can set viewBox for default camera', function(st) {
    var container = setUp();
    st.plan(1);

    var props = defaultProps();
    props.camera.x = 0;
    props.camera.y = 0;
    props.camera.zoom = 1;

    ReactDOM.render(<SvgCamera {...props}/>, container);
    var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

    var domNode = ReactDOM.findDOMNode(componentInstance);

    st.equal(domNode.style.visibility, '');

    tearDown();
  });

  t.test('can set viewBox for zoomed in camera', function(st) {
    var container = setUp();
    st.plan(1);

    var props = defaultProps();
    props.camera.x = 0;
    props.camera.y = 0;
    props.camera.zoom = 2;

    ReactDOM.render(<SvgCamera {...props}/>, container);
    var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

    var domNode = ReactDOM.findDOMNode(componentInstance);

    st.equal(domNode.getAttribute('viewBox'), '-50 -25 100 50');

    tearDown();
  });

  t.test('can set viewBox for zoomed out camera', function(st) {
    var container = setUp();
    st.plan(1);

    var props = defaultProps();
    props.camera.x = 0;
    props.camera.y = 0;
    props.camera.zoom = 0.5;

    ReactDOM.render(<SvgCamera {...props}/>, container);
    var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

    var domNode = ReactDOM.findDOMNode(componentInstance);

    st.equal(domNode.getAttribute('viewBox'), '-200 -100 400 200');

    tearDown();
  });

  t.test('can set viewBox for scrolled camera', function(st) {
    var container = setUp();
    st.plan(1);

    var props = defaultProps();
    props.camera.x = 100;
    props.camera.y = 40;
    props.camera.zoom = 1;

    ReactDOM.render(<SvgCamera {...props}/>, container);
    var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

    var domNode = ReactDOM.findDOMNode(componentInstance);

    st.equal(domNode.getAttribute('viewBox'), '0 -10 200 100');

    tearDown();
  });

  t.test('can set viewBox for zoomed and scrolled camera', function(st) {
    var container = setUp();
    st.plan(1);

    var props = defaultProps();
    props.camera.x = 100;
    props.camera.y = 40;
    props.camera.zoom = 2;

    ReactDOM.render(<SvgCamera {...props}/>, container);
    var componentInstance = ReactDOM.render(<SvgCamera {...props}/>, container);

    var domNode = ReactDOM.findDOMNode(componentInstance);

    st.equal(domNode.getAttribute('viewBox'), '50 15 100 50');

    tearDown();
  });
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
