'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var AvgGrid = require('./AvgGrid');
var omit = require('object.omit');

var Thumbnails = createReactClass({
  displayName: 'Thumbnails',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'thumbnails'
    };
  },

  render: function() {
    var classes = classNames(this.getClassSet(), this.props.className);
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <AvgGrid
        {...restProps}
        className={classes}
      >
        {React.Children.map(this.props.children, function(child, i) {
          return (
            <li key={i}>
              {child}
            </li>
          );
        })}
      </AvgGrid>
    );
  },
});

module.exports = Thumbnails;
