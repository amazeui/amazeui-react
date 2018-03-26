'use strict';

var PropTypes = require('prop-types');

/**
 * Custom radio/checkbox style
 */

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var Input = require('./Input');
var Icon = require('./Icon');
var constants = require('./constants');

var UCheck = createReactClass({
  displayName: 'UCheck',
  mixins: [ClassNameMixin],

  propTypes: {
    type: PropTypes.oneOf(['radio', 'checkbox']),
    disabled: PropTypes.bool,
    amStyle: PropTypes.oneOf(['secondary', 'success', 'warning',
      'danger']),
    inline: PropTypes.bool,
    hasFeedback: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      type: 'checkbox'
    };
  },

  render: function() {
    var classSet = {};
    var restProps = omit(this.props, ['inline', 'amStyle', 'hasFeedback']);

    classSet[this.setClassNamespace(this.props.type)] = !this.props.inline;
    classSet[this.setClassNamespace(this.props.type + '-inline')] =
      this.props.inline;

    if (this.props.amStyle) {
      classSet[this.setClassNamespace(this.props.amStyle)] = true;
    }

    return (
      <label className={classNames(this.props.className, classSet)}>
        <Input
          {...restProps}
          ref="field"
          className={this.setClassNamespace('ucheck-checkbox')}
          standalone
        />

        <span className={this.setClassNamespace('ucheck-icons')}>
          <Icon icon="unchecked" />
          <Icon icon="checked" />
        </span>

        {this.props.label}
      </label>
    );
  },
});

module.exports = UCheck;
