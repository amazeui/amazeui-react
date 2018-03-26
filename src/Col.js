'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Col = createReactClass({
  displayName: 'Col',
  mixins: [ClassNameMixin],

  propTypes: {
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    smOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    lgOffset: PropTypes.number,
    smPush: PropTypes.number,
    mdPush: PropTypes.number,
    lgPush: PropTypes.number,
    smPull: PropTypes.number,
    mdPull: PropTypes.number,
    lgPull: PropTypes.number,
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
    end: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'u',
      component: 'div'
    };
  },

  render: function() {
    var Component = this.props.component;
    var classSet = {};
    var props = this.props;
    var prefixClass = this.prefixClass;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    ['sm', 'md', 'lg'].forEach(function(size) {
      var prop = size;

      if (props[size]) {
        classSet[prefixClass(size + '-' + props[prop])] = true;
      }

      prop = size + 'Offset';
      if (props[prop] >= 0) {
        classSet[prefixClass(size + '-offset-') + props[prop]] = true;
      }
      restProps = omit(restProps, prop);

      prop = size + 'Push';
      if (props[prop] >= 0) {
        classSet[prefixClass(size + '-push-') + props[prop]] = true;
      }
      restProps = omit(restProps, prop);

      prop = size + 'Pull';
      if (props[prop] >= 0) {
        classSet[prefixClass(size + '-pull-') + props[prop]] = true;
      }
      restProps = omit(restProps, prop);

      // `xxResetOrder` prop
      // - smResetOrder
      // - mdResetOrder
      // - lgResetOrder
      if (props[size + 'ResetOrder']) {
        classSet[prefixClass(size + '-reset-order')] = true;
      }
      restProps = omit(restProps, size + 'ResetOrder');

      // `xxCentered` prop
      // - smCentered
      // - mdCentered
      // - lgCentered
      if (props[size + 'Centered']) {
        classSet[prefixClass(size + '-centered')] = true;
      }
      restProps = omit(restProps, size + 'Centered');

      // `xxUnCentered` prop
      // - smUnCentered
      // - mdUnCentered
      // - lgUnCentered
      if (props[size + 'UnCentered']) {
        classSet[prefixClass(size + '-uncentered')] = true;
      }
      restProps = omit(restProps, size + 'UnCentered');
    });

    // `end` prop - end column
    classSet[prefixClass('end')] = props.end;

    return (
      <Component
        {...restProps}
        className={classNames(this.props.className, classSet)}
      >
        {this.props.children}
      </Component>
    );
  },
});

module.exports = Col;
