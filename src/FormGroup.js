'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var FormGroup = createReactClass({
  displayName: 'FormGroup',
  mixins: [ClassNameMixin],

  propTypes: {
    validation: PropTypes.string,
    amSize: PropTypes.oneOf(['sm', 'lg']),
    hasFeedback: PropTypes.bool
  },

  render: function() {
    var classSet = {};

    classSet[this.setClassNamespace('form-group')] = true;
    this.props.validation && (classSet[this.setClassNamespace('form-' +
      this.props.validation)] = true);
    classSet[this.setClassNamespace('form-feedback')] = this.props.hasFeedback;
    classSet[this.setClassNamespace('form-icon')] = this.props.hasFeedback;

    if (this.props.amSize) {
      classSet[this.setClassNamespace('form-group-' +
        this.props.amSize)] = true;
    }

    return (
      <div className={classNames(classSet, this.props.className)}>
        {this.props.children}
      </div>
    );
  },
});

module.exports = FormGroup;
