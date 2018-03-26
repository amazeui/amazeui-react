'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Nav = createReactClass({
  displayName: 'Nav',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    justify: PropTypes.bool,
    pills: PropTypes.bool,
    tabs: PropTypes.bool,
    topbar: PropTypes.bool,
    component: PropTypes.node.isRequired
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'nav',
      component: 'ul'
    };
  },

  render: function() {
    var classes = this.getClassSet();
    var Component = this.props.component;
    var restProps = omit(this.props, [
      'classPrefix',
      'justify',
      'pills',
      'tabs',
      'topbar',
      'component',
      'active',
      'activeKey',
      'activeHref',
      'navItem'
    ]);

    // set classes
    classes[this.prefixClass('pills')] = this.props.pills || this.props.topbar;
    classes[this.prefixClass('tabs')] = this.props.tabs;
    classes[this.prefixClass('justify')] = this.props.justify;

    // topbar class
    classes[this.setClassNamespace('topbar-nav')] = this.props.topbar;

    return (
      <Component
        {...restProps}
        className={classNames(classes, this.props.className)}
      >
        {this.props.children}
      </Component>
    );
  },
});

module.exports = Nav;
