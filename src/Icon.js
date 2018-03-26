'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Icon = createReactClass({
  displayName: 'Icon',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    component: PropTypes.node.isRequired,
    amStyle: PropTypes.string,
    amSize: PropTypes.string,
    fw: PropTypes.bool,
    spin: PropTypes.bool,
    button: PropTypes.bool,
    size: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'icon',
      component: 'span'
    };
  },

  render: function() {
    var classes = this.getClassSet(true);
    var props = this.props;
    var Component = props.href ? 'a' : props.component;
    var prefixClass = this.prefixClass;
    var setClassNamespace = this.setClassNamespace;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    // am-icon-[iconName]
    classes[prefixClass(props.icon)] = true;

    // am-icon-btn
    classes[prefixClass('btn')] = props.button;

    // button style
    props.button && props.amStyle &&
    (classes[setClassNamespace(props.amStyle)] = true);

    // am-icon-fw
    classes[prefixClass('fw')] = props.fw;

    // am-icon-spin
    classes[prefixClass('spin')] = props.spin;

    return (
      <Component
        {...restProps}
        href={this.props.href}
        className={classNames(classes, this.props.className)}
      >
        {this.props.children}
      </Component>
    );
  },
});

module.exports = Icon;
