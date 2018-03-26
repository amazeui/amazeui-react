'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Footer = createReactClass({
  displayName: 'Footer',
  mixins: [ClassNameMixin],

  propTypes: {
    theme: PropTypes.oneOf(['default']),
    classPrefix: PropTypes.string,
    mobileTitle: PropTypes.string,
    mobileLink: PropTypes.string,
    desktopTitle: PropTypes.string,
    desktopLink: PropTypes.string,
    onRequestMobile: PropTypes.func,
    onRequestDesktop: PropTypes.func,
    data: PropTypes.array
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'footer',
      theme: 'default',
      mobileTitle: '适配版',
      desktopTitle: '电脑版'
    };
  },

  render: function() {
    var classSet = this.getClassSet();
    var MobileTag = this.props.mobileLink ? 'a' : 'span';
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <footer
        {...restProps}
        data-am-widget={this.props.classPrefix}
        className={classNames(this.props.className, classSet)}
      >
        <div className={this.prefixClass('switch')}>
          <MobileTag
            className={this.prefixClass('ysp')}
            onClick={this.props.onRequestMobile}
            href={this.props.mobileLink}
            data-rel="mobile"
          >
            {this.props.mobileTitle}
          </MobileTag>
          <span className={this.prefixClass('divider')}>|</span>
          <a
            data-rel="desktop"
            href={this.props.desktopLink}
            onClick={this.props.onRequestDesktop}
            className={this.prefixClass('desktop')}
          >
            {this.props.desktopTitle}
          </a>
        </div>
        <div className={this.prefixClass('miscs')}>
          {this.props.data ? (
            this.props.data.map(function(item, i) {
              return (
                <p key={i}>{item}</p>
              );
            })
          ) : this.props.children}
        </div>
      </footer>
    );
  },
});

module.exports = Footer;
