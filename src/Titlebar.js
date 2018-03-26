'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var AvgGrid = require('./AvgGrid');
var omit = require('object.omit');

var Titlebar = createReactClass({
  displayName: 'Titlebar',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    theme: PropTypes.oneOf(['default', 'multi', 'cols']),
    nav: PropTypes.array,
    title: PropTypes.node
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'titlebar',
      theme: 'default',
      data: []
    };
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <div
        {...restProps}
        data-am-widget={this.props.classPrefix}
        className={classNames(this.props.className, classSet)}
      >
        <h2 className={this.prefixClass('title')}>
          {this.props.href ? (
            <a href={this.props.href}>
              {this.props.title}
            </a>
          ) : this.props.title}
        </h2>
        {this.props.nav ? (
          <nav className={this.prefixClass('nav')}>
            {this.props.nav.map(function(item, i) {
              return (
                <a href={item.link} key={i}>
                  {item.title}
                </a>);
            })}
          </nav>
        ) : null}
      </div>
    );
  },
});

module.exports = Titlebar;
