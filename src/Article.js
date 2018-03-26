'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Article = createReactClass({
  displayName: 'Article',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    title: PropTypes.node,
    meta: PropTypes.node,
    lead: PropTypes.node
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'article'
    };
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <article
        {...restProps}
        className={classNames(classSet, this.props.className)}
      >
        <header className={this.prefixClass('hd')}>
          {this.props.title ? (
            <Article.Child role="title">
              {this.props.title}
            </Article.Child>
          ) : null}

          {this.props.meta ? (
            <Article.Child role="meta">
              {this.props.meta}
            </Article.Child>
          ) : null}
        </header>
        <div className={this.prefixClass('bd')}>
          {this.props.lead ? (
            <Article.Child role="lead">
              {this.props.lead}
            </Article.Child>
          ) : null}
          {this.props.children}
        </div>
      </article>
    );
  },
});

Article.Child = createReactClass({
  mixins: [ClassNameMixin],

  propTypes: {
    role: PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      role: 'title'
    };
  },

  render: function() {
    var role = this.props.role;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));
    var Component;
    var classes = classNames(
      this.props.className,
      this.setClassNamespace('article-' + role)
    );

    switch (role) {
      case 'meta':
      case 'lead':
        Component = 'p';
        break;
      case 'title':
        Component = 'h1';
        break;
      default:
        Component = 'div';
    }

    return role === 'divider' ? (
      <hr
        {...restProps}
        className={classes}
      />
    ) : (
      <Component
        {...restProps}
        className={classes}
      >
        {this.props.children}
      </Component>
    );
  }
});

module.exports = Article;
