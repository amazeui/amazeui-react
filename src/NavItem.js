'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var assign = require('object-assign');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var NavItem = createReactClass({
  displayName: 'NavItem',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    header: PropTypes.bool,
    divider: PropTypes.bool,
    href: PropTypes.any,
    component: PropTypes.any,
    linkComponent: PropTypes.any,
    linkProps: PropTypes.object
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'nav',
      component: 'li'
    };
  },

  render: function() {
    var classes = this.getClassSet();
    var props = this.props;
    var Component = props.component;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    // del am-nav
    classes[this.setClassNamespace(props.classPrefix)] = false;

    // set classes
    classes[this.prefixClass('header')] = props.header;
    classes[this.prefixClass('divider')] = props.divider;

    if (props.href || props.linkComponent) {
      return this.renderAnchor(classes);
    }

    return (
      <Component
        {...restProps}
        className={classNames(classes, props.className)}
      >
        {this.props.children}
      </Component>
    );
  },

  renderAnchor: function(classes) {
    var Component = this.props.component;
    var linkComponent = this.props.linkComponent || 'a';
    var style = {};
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    this.props.disabled && (style.pointerEvents = 'none');

    var linkProps = {
      href: this.props.href,
      title: this.props.title,
      target: this.props.target,
      style: style
    };

    return (
      <Component
        {...restProps}
        className={classNames(classes, this.props.className)}
      >
        {
          React.createElement(
            linkComponent,
            assign(linkProps, this.props.linkProps),
            this.props.children
          )
        }
      </Component>
    );
  },
});

module.exports = NavItem;

// TODO: DropDown Tab 处理
