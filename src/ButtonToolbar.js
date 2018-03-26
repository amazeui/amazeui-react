'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var ButtonToolbar = createReactClass({
  displayName: 'ButtonToolbar',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'btn-toolbar'
    };
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <div
        {...restProps}
        className={classNames(this.props.className, classSet)}
      >
        {this.props.children}
      </div>
    );
  },
});

module.exports = ButtonToolbar;
