'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var SmoothScrollMixin = require('./mixins/SmoothScrollMixin');
var Events = require('./utils/Events');
var debounce = require('./utils/debounce');
var dom = require('./utils/domUtils');
var CSSCore = require('./utils/CSSCore');
var Icon = require('./Icon');

var GoTop = createReactClass({
  displayName: 'GoTop',
  mixins: [ClassNameMixin, SmoothScrollMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['default', 'fixed']),
    title: PropTypes.string,
    src: PropTypes.string,
    icon: PropTypes.string,
    autoHide: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'gotop',
      theme: 'default'
    };
  },

  componentDidMount: function() {
    if (this.isAutoHide()) {
      var check = this.checkPosition;

      check();

      this._listener = Events.on(window, 'scroll', debounce(check, 100));
    }
  },

  componentWillUnmount: function() {
    this._listener && this._listener.off();
  },

  checkPosition: function() {
    var action = (dom.scrollTop(window) > 50 ? 'add' : 'remove') + 'Class';

    CSSCore[action](ReactDOM.findDOMNode(this), this.setClassNamespace('active'));
  },

  isAutoHide: function() {
    return this.props.theme === 'fixed' && this.props.autoHide;
  },

  handleClick: function(e) {
    e.preventDefault();
    this.smoothScroll();
  },

  renderIcon: function() {
    return this.props.src ? (
      <img
        className={this.prefixClass('icon-custom')}
        src={this.props.src}
        alt={this.props.title}
      />
    ) : (
      <Icon
        className={this.prefixClass('icon')}
        icon={this.props.icon || 'chevron-up'}
      />
    );
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    classSet[this.prefixClass(this.props.theme)] = true;
    classSet[this.setClassNamespace('active')] = !this.isAutoHide();

    return (
      <div
        {...restProps}
        data-am-widget={this.props.classPrefix}
        className={classNames(classSet, this.props.className)}
      >
        <a
          href="#top"
          onClick={this.handleClick}
          title={this.props.title}
        >
          {this.props.title ? (
            <span className={this.prefixClass('title')}>
              {this.props.title}
            </span>
          ) : null}
          {this.renderIcon()}
        </a>
      </div>
    );
  },
});

module.exports = GoTop;
