'use strict';

var React = require('react');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var Icon = require('./Icon');

var Header = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    theme: React.PropTypes.oneOf(['default']),
    data: React.PropTypes.object,
    fixed: React.PropTypes.bool,
    title: React.PropTypes.node,
    link: React.PropTypes.string,
    //不使用link时, 可指定handler事件处理及对应scope
    handler: React.PropTypes.func,
    scope: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'header',
      theme: 'default'
    };
  },

  renderTitle: function() {
    let me = this;
    if(me.props.title){
      let linkStr = me.props.title;
      if(me.props.link){
        linkStr = (
          <a href={me.props.link}>
            {me.props.title}
          </a>
        )
      }
      else if(me.props.handler){
        linkStr = (
          <a onClick={me.props.handler.bind(me.props.scope)}>
            {me.props.title}
          </a>
        )
      }
      return (
        <h1 className={me.prefixClass('title')}>
          {linkStr}
        </h1>
      )
    }
    else{
      return null;
    }
  },

  renderNav: function(position) {
    var data = this.props.data;
    var renderItem = function(item, i) {
      return (
          {item.link ? (
            <a href={item.link}
               key={'headerNavItem' + i}>
          ) : (
            <a onClick={item.handler.bind(item.scope)}
               key={'headerNavItem' + i}>)}

          {item.title ? (
            <span className={this.prefixClass('nav-title')}>
              {item.title}
            </span>
          ) : null}

          {item.customIcon ? (
            <img src={item.customIcon} alt={item.title || null}/>
          ) : item.icon ? (
            <Icon
              className={this.prefixClass('icon')}
              icon={item.icon}/>
          ) : null}
        </a>
      );
    }.bind(this);

    return data && data[position] ? (
      <div
        className={classNames(this.prefixClass('nav'),
        this.prefixClass(position))}>
        {data[position].map(function(item, i) {
          return renderItem(item, i);
        })}
      </div>
    ) : null;
  },

  render: function() {
    var classSet = this.getClassSet();

    // am-header-fixed: fixed header
    classSet[this.prefixClass('fixed')] = this.props.fixed;

    return (
      <header
        {...this.props}
        data-am-widget={this.props.classPrefix}
        className={classNames(this.props.className, classSet)}>
        {this.renderNav('left')}
        {this.renderTitle()}
        {this.renderNav('right')}
      </header>
    );
  }
});

module.exports = Header;
