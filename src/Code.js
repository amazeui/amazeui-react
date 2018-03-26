'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Code = createReactClass({
  displayName: 'Code',
  mixins: [ClassNameMixin],

  propTypes: {
    language: PropTypes.string,
    escape: PropTypes.bool,
    highlight: PropTypes.func
  },

  getDefaultProps: function() {
  },

  escape: function(html) {
    return html.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  render: function() {
    var langClassName = this.props.language &&
      ('language-' + this.props.language);
    var children = this.props.children;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    if (this.props.escape) {
      children = this.escape(children);
    }

    if (this.props.highlight) {
      children = this.props.highlight(language, children);
    }

    return (
      <pre
        {...restProps}
        className={classNames(this.props.className, langClassName)}
      >
        {children}
      </pre>
    );
  },
});

module.exports = Code;
