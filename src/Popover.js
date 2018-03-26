'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Popover = createReactClass({
  displayName: 'Popover',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    positionLeft: PropTypes.number,
    positionTop: PropTypes.number,
    amSize: PropTypes.oneOf(['sm', 'lg']),
    amStyle: PropTypes.string,
    onRequestHide: PropTypes.func
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'popover'
    };
  },

  render: function() {
    var classSet = this.getClassSet();
    var style = {
      left: this.props.positionLeft,
      top: this.props.positionTop,
      display: 'block'
    };
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    classSet[this.setClassNamespace('active')] = true;
    classSet[this.prefixClass(this.props.placement)] = true;

    return (
      <div
        {...restProps}
        style={style}
        className={classNames(classSet, this.props.className)}
      >
        <div className={this.prefixClass('inner')}>
          {this.props.children}
        </div>
        <div className={this.prefixClass('caret')}></div>
      </div>
    );
  },
});

module.exports = Popover;
