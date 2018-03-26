'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Divider = createReactClass({
  displayName: 'Divider',
  mixins: [ClassNameMixin],

  propTypes: {
    theme: PropTypes.oneOf(['default', 'dotted', 'dashed']),
    classPrefix: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'divider',
      theme: 'default'
    };
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <hr
        {...restProps}
        data-am-widget={this.props.classPrefix}
        className={classNames(this.props.className, classSet)}
      />
    );
  },
});

module.exports = Divider;
