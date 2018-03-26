'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var omit = require('object.omit');

var Button = createReactClass({
  displayName: 'Button',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    active: PropTypes.bool,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    radius: PropTypes.bool,
    round: PropTypes.bool,
    component: PropTypes.node,
    href: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.string,
    amSize: PropTypes.string,
    amStyle: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'btn',
      type: 'button',
      amStyle: 'default'
    };
  },

  removeUnknownProps() {
    return omit(this.props, [
      'classPrefix',
      'active',
      'block',
      'radius',
      'round',
      'component',
      'amSize',
      'amStyle'
    ]);
  },

  renderAnchor: function(classSet) {
    var Component = this.props.component || 'a';
    var href = this.props.href || '#';
    var restProps = this.removeUnknownProps();

    return (
      <Component
        {...restProps}
        href={href}
        target={this.props.target}
        className={classNames(this.props.className, classSet)}
        role="button"
      >
        {this.props.children}
      </Component>
    );
  },

  renderButton: function(classSet) {
    var Component = this.props.component || 'button';
    var restProps = this.removeUnknownProps();

    return (
      <Component
        {...restProps}
        className={classNames(this.props.className, classSet)}
      >
        {this.props.children}
      </Component>
    );
  },

  render: function() {
    var classSet = this.getClassSet();
    var renderType = this.props.href || this.props.target ?
      'renderAnchor' : 'renderButton';

    // block button
    classSet[this.prefixClass('block')] = this.props.block;

    return this[renderType](classSet);
  },
});

module.exports = Button;
