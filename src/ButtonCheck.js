'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var omit = require('object.omit');
var CSSCore = require('./utils/CSSCore');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var ButtonGroup = require('./ButtonGroup');
var constants = require('./constants');

var ButtonCheck = createReactClass({
  displayName: 'ButtonCheck',
  mixins: [ClassNameMixin],

  propTypes: {
    clickHandler: PropTypes.func
  },

  getDefaultProps: function() {
    return {
      clickHandler: function() {
      }
    };
  },

  handleClick: function(e) {
    var changed = true;
    var target = e.target;
    var activeClassName = constants.CLASSES.active;

    if (target && target.nodeName === 'INPUT') {
      var parent = target.parentNode;

      if (target.type === 'radio') {
        if (target.checked && CSSCore.hasClass(parent, activeClassName)) {
          changed = false;
        } else {
          var siblings = parent.parentNode.children;

          // remove siblings activeClassName
          for (var i = 0; i < siblings.length; i++) {
            (siblings[i] !== parent) &&
            CSSCore.removeClass(siblings[i], activeClassName);
          }
        }
      }

      if (changed) {
        CSSCore.toggleClass(parent, activeClassName);
      }
    }

    this.props.clickHandler.call(this);
  },

  render: function() {
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <ButtonGroup
        {...restProps}
        onClick={this.handleClick}
        className={this.setClassNamespace('btn-group-check')}
      >
        {this.props.children}
      </ButtonGroup>
    );
  },
});

module.exports = ButtonCheck;
