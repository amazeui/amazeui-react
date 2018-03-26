'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var assign = require('object-assign');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var ListItem = createReactClass({
  displayName: 'ListItem',
  mixins: [ClassNameMixin],

  propTypes: {
    href: PropTypes.string,
    truncate: PropTypes.bool,
    component: PropTypes.any.isRequired,
    linkComponent: PropTypes.any,
    linkProps: PropTypes.object
  },

  getDefaultProps: function() {
    return {
      component: 'li'
    };
  },

  render: function() {
    var classes = {};
    var Component = this.props.component;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    // set .am-text-truncate
    classes['am-text-truncate'] = this.props.truncate;

    // render Anchor
    if (this.props.href || this.props.linkComponent) {
      return this.renderAnchor(classes);
    }

    return (
      <Component
        {...restProps}
        className={classNames(classes, this.props.className)}
      >
        {this.props.children}
      </Component>
    );
  },

  renderAnchor: function(classes) {
    var props = this.props;
    var Component = props.component;
    var truncate = props.truncate ? 'am-text-truncate' : '';
    var linkComponent = this.props.linkComponent || 'a';
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <Component
        {...restProps}
        className={classNames(classes, this.props.className)}
      >
        {
          React.createElement(
            linkComponent,
            assign({
              className: truncate,
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
});

module.exports = ListItem;
