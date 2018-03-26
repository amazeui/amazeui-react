'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var assign = require('object-assign');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Breadcrumb = createReactClass({
  displayName: 'Breadcrumb',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    component: PropTypes.node.isRequired,
    slash: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'breadcrumb',
      component: 'ul'
    };
  },

  render: function() {
    var classes = this.getClassSet();
    var Component = this.props.component;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    classes[this.prefixClass('slash')] = this.props.slash;

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

Breadcrumb.Item = createReactClass({
  mixins: [ClassNameMixin],

  propTypes: {
    active: PropTypes.bool,
    href: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    component: PropTypes.any,
    linkComponent: PropTypes.any,
    linkProps: PropTypes.object
  },

  getDefaultProps() {
    return {
      component: 'li'
    };
  },

  renderAnchor: function(classes) {
    var Component = this.props.component;
    var linkComponent = this.props.linkComponent || 'a';
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <Component
        {...restProps}
        className={classes}
      >
        {
          React.createElement(
            linkComponent,
            assign({
              href: this.props.href,
              title: this.props.title,
              target: this.props.target
            }, this.props.linkProps),
            this.props.children
          )
        }
      </Component>
    );
  },

  render: function() {
    var classes = classNames(this.props.className);
    var Component = this.props.component;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    if (this.props.href || this.props.linkComponent) {
      return this.renderAnchor(classes);
    }

    return (
      <Component
        {...restProps}
        className={classes}
      >
        {this.props.children}
      </Component>
    );
  }
});

module.exports = Breadcrumb;
