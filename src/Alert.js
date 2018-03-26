'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Alert = createReactClass({
  displayName: 'Alert',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    amStyle: PropTypes.oneOf(['secondary', 'success', 'warning',
      'danger']),
    onClose: PropTypes.func
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'alert'
    };
  },

  renderCloseBtn: function() {
    return (
      <button
        type='button'
        className={this.setClassNamespace('close')}
        onClick={this.props.onClose}
      >
        &times;
      </button>
    );
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));
    var isCloseable = !!this.props.onClose;

    if (this.props.amStyle) {
      classSet[this.prefixClass(this.props.amStyle)] = true;
    }

    classSet[this.prefixClass('closeable')] = isCloseable;

    return (
      <div
        {...restProps}
        className={classNames(this.props.className, classSet)}
      >
        {isCloseable ? this.renderCloseBtn() : null}
        {this.props.children}
      </div>
    );
  },
});

module.exports = Alert;
